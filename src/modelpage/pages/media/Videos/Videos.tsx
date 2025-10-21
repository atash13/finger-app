import React, { useEffect, useState } from "react";
import "./Videos.css";
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../firebase";

interface Album {
  name: string;
  coverUrl: string;
  count: number;
}

const Videos: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [albumVideos, setAlbumVideos] = useState<string[]>([]);
  const [confirmDeleteVideo, setConfirmDeleteVideo] = useState<{
    url: string;
    index: number;
  } | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // 🔹 Albümleri yükle (sadece "videos/" klasöründen)
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const listRef = ref(storage, "videos");
        const res = await listAll(listRef);
        const albumData = await Promise.all(
          res.prefixes.map(async (folderRef) => {
            const videoList = await listAll(folderRef);
            const coverUrl =
              videoList.items.length > 0
                ? await getDownloadURL(videoList.items[0])
                : "https://via.placeholder.com/150";
            return {
              name: folderRef.name,
              coverUrl,
              count: videoList.items.length,
            };
          })
        );
        setAlbums(albumData);
      } catch (error) {
        console.error("Error fetching video albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // 🔹 Yeni albüm oluştur
  const handleCreateAlbum = async () => {
    if (!newAlbumName.trim()) return;
    setLoading(true);
    try {
      const folderRef = ref(storage, `videos/${newAlbumName}/placeholder.txt`);
      const blob = new Blob(["placeholder"], { type: "text/plain" });
      await uploadBytes(folderRef, blob);

      setAlbums([
        ...albums,
        {
          name: newAlbumName,
          coverUrl: "https://via.placeholder.com/150",
          count: 0,
        },
      ]);
      setShowModal(false);
      setNewAlbumName("");
    } catch (error) {
      console.error("Error creating video album:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Albüm seçilince videoları göster
  const handleAlbumClick = async (albumName: string) => {
    setSelectedAlbum(albumName);
    try {
      const albumRef = ref(storage, `videos/${albumName}`);
      const res = await listAll(albumRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setAlbumVideos(urls.filter((u) => !u.endsWith("placeholder.txt")));
    } catch (error) {
      console.error("Error loading album videos:", error);
    }
  };

  // 🔹 Video ekle
  const handleAddVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedAlbum || !e.target.files || e.target.files.length === 0)
      return;
    setUploadingVideo(true);
    try {
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const videoRef = ref(
          storage,
          `videos/${selectedAlbum}/${Date.now()}-${file.name}`
        );
        await uploadBytes(videoRef, file);
        const url = await getDownloadURL(videoRef);
        uploadedUrls.push(url);
      }
      setAlbumVideos((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploadingVideo(false);
    }
  };

  // 🔹 Video sil (sadece modal onayıyla)
  const handleDeleteVideo = async () => {
    if (!selectedAlbum || !confirmDeleteVideo) return;

    try {
      const url = confirmDeleteVideo.url;
      const albumRef = ref(storage, `videos/${selectedAlbum}`);
      const res = await listAll(albumRef);
      let foundRef = null;
      for (const item of res.items) {
        const itemUrl = await getDownloadURL(item);
        if (itemUrl === url) {
          foundRef = item;
          break;
        }
      }
      if (foundRef) {
        await deleteObject(foundRef);
        setAlbumVideos((prev) =>
          prev.filter((_, i) => i !== confirmDeleteVideo.index)
        );
      } else {
        alert("Video silinemedi: storage'da bulunamadı.");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Video silinemedi.");
    }
    setConfirmDeleteVideo(null);
  };

  // 🔹 Albüm sil
  const handleDeleteAlbum = async (albumName: string) => {
    if (
      !window.confirm(
        `${albumName} albümünü kalıcı olarak silmek istediğine emin misin?`
      )
    ) {
      return;
    }
    try {
      const albumRef = ref(storage, `videos/${albumName}`);
      const res = await listAll(albumRef);
      await Promise.all(res.items.map((item) => deleteObject(item)));
      setAlbums(albums.filter((a) => a.name !== albumName));
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error deleting video album:", error);
    }
  };

  return (
    <div className="videos-container">
      {!selectedAlbum ? (
        <>
          <div className="videos-header">
            <h2>Media / Videos</h2>
            <button
              className="new-album-btn"
              onClick={() => setShowModal(true)}
            >
              + New Album
            </button>
          </div>

          <div className="albums-grid">
            {albums.map((album, index) => (
              <div key={index} className="album-card">
                <button
                  className="delete-album-btn"
                  onClick={() => handleDeleteAlbum(album.name)}
                >
                  🗑
                </button>
                <img
                  src={album.coverUrl}
                  alt={album.name}
                  onClick={() => handleAlbumClick(album.name)}
                />
                <p>
                  {album.name}{" "}
                  <span className="video-count">({album.count})</span>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="album-detail">
          <button className="back-btn" onClick={() => setSelectedAlbum(null)}>
            ← Geri
          </button>
          <h3 className="album-title">{selectedAlbum}</h3>

          <div className="add-video-section">
            <button
              className="add-video-btn"
              onClick={() =>
                document.getElementById("add-video-input")?.click()
              }
              disabled={uploadingVideo}
            >
              {uploadingVideo ? "Uploading..." : "+ Add Video"}
            </button>

            <input
              id="add-video-input"
              type="file"
              accept="video/mp4, video/webm, video/ogg"
              multiple
              className="hidden-file-input"
              onChange={handleAddVideo}
            />
          </div>

          <div className="videos-grid">
            {albumVideos.map((url, index) => (
              <div key={index} className="video-item">
                <video src={url} controls />
                <button
                  className="delete-video-btn"
                  onClick={() => setConfirmDeleteVideo({ url, index })}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Video silme onayı */}
          {confirmDeleteVideo && (
            <div className="modal-overlay">
              <div className="modal">
                <p>This video will be deleted permanently, are you sure? </p>
                <div className="modal-buttons">
                  <button onClick={() => setConfirmDeleteVideo(null)}>
                    İptal
                  </button>
                  <button onClick={handleDeleteVideo}>Sil</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Yeni Video Albümü Oluştur</h3>
            <input
              className="new-album-input"
              type="text"
              placeholder="Albüm adı"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>İptal</button>
              <button onClick={handleCreateAlbum} disabled={loading}>
                {loading ? "Oluşturuluyor..." : "Oluştur"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
