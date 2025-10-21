import React, { useEffect, useState } from "react";
import "./Photos.css";
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

const Photos: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [albumPhotos, setAlbumPhotos] = useState<string[]>([]);
  const [confirmDeletePhoto, setConfirmDeletePhoto] = useState<{
    url: string;
    index: number;
  } | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // 🔹 Albümleri yükle
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const listRef = ref(storage, "");
        const res = await listAll(listRef);
        const albumData = await Promise.all(
          res.prefixes.map(async (folderRef) => {
            const photoList = await listAll(folderRef);
            const coverUrl =
              photoList.items.length > 0
                ? await getDownloadURL(photoList.items[0])
                : "https://via.placeholder.com/150";
            return {
              name: folderRef.name,
              coverUrl,
              count: photoList.items.length,
            };
          })
        );
        setAlbums(albumData);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  // 🔹 Yeni albüm oluştur
  const handleCreateAlbum = async () => {
    if (!newAlbumName.trim()) return;
    setLoading(true);
    try {
      const folderRef = ref(storage, `photos/${newAlbumName}/placeholder.txt`);
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
      console.error("Error creating album:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Albüm seçilince fotoğrafları göster
  const handleAlbumClick = async (albumName: string) => {
    setSelectedAlbum(albumName);
    try {
      const albumRef = ref(storage, albumName);
      const res = await listAll(albumRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setAlbumPhotos(urls.filter((u) => !u.endsWith("placeholder.txt")));
    } catch (error) {
      console.error("Error loading album photos:", error);
    }
  };

  // 🔹 Fotoğraf ekle
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedAlbum || !e.target.files || e.target.files.length === 0)
      return;
    setUploadingPhoto(true);
    try {
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const photoRef = ref(
          storage,
          `${selectedAlbum}/${Date.now()}-${file.name}`
        );
        await uploadBytes(photoRef, file);
        const url = await getDownloadURL(photoRef);
        uploadedUrls.push(url);
      }
      setAlbumPhotos((prev) => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // 🔹 Fotoğraf sil (sadece kendi popup onayıyla)
  const handleDeletePhoto = async () => {
    if (!selectedAlbum || !confirmDeletePhoto) return;

    try {
      const url = confirmDeletePhoto.url;
      const albumRef = ref(storage, selectedAlbum);
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
        setAlbumPhotos((prev) =>
          prev.filter((_, i) => i !== confirmDeletePhoto.index)
        );
      } else {
        alert("Fotoğraf silinemedi: storage'da bulunamadı.");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Fotoğraf silinemedi.");
    }
    setConfirmDeletePhoto(null);
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
      const albumRef = ref(storage, albumName);
      const res = await listAll(albumRef);
      await Promise.all(res.items.map((item) => deleteObject(item)));
      setAlbums(albums.filter((a) => a.name !== albumName));
      setSelectedAlbum(null);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="photos-container">
      {!selectedAlbum ? (
        <>
          <div className="photos-header">
            <h2>Media / Photos</h2>
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
                  <span className="photo-count">({album.count})</span>
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

          {/* 🔹 Yeni buton tasarımıyla fotoğraf ekleme */}
          <div className="add-photo-section">
            <button
              className="add-photo-btn"
              onClick={() =>
                document.getElementById("add-photo-input")?.click()
              }
              disabled={uploadingPhoto}
            >
              {uploadingPhoto ? "Uploading..." : "+ Add Photo"}
            </button>

            <input
              id="add-photo-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              multiple
              className="hidden-file-input"
              onChange={handleAddPhoto}
            />
          </div>

          <div className="photos-grid">
            {albumPhotos.map((url, index) => (
              <div key={index} className="photo-item">
                <img src={url} alt={`photo-${index}`} />
                <button
                  className="delete-photo-btn"
                  onClick={() => setConfirmDeletePhoto({ url, index })}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Fotoğraf silme onayı */}
          {confirmDeletePhoto && (
            <div className="modal-overlay">
              <div className="modal">
                <p>This photo will be deleted permanently, are you sure? </p>
                <div className="modal-buttons">
                  <button onClick={() => setConfirmDeletePhoto(null)}>
                    İptal
                  </button>
                  <button onClick={handleDeletePhoto}>Sil</button>
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
            <h3>Yeni Albüm Oluştur</h3>
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

export default Photos;
