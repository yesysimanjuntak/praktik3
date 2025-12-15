import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserCard from "./components/UserCard/UserCard";
import ProductList from "./components/ProductList/ProductList";
import Button from "./components/Button/Button";
import "./App.css";

function App() {
  // Data pengguna awal
  const [users, setUsers] = useState([
    { name: "Eci", email: "eci@example.com", role: "Admin", avatar: "https://i.pravatar.cc/100" },
  ]);

  // ✅ Products diubah jadi state supaya bisa diedit
  const [products, setProducts] = useState([
    { name: "Laptop", price: 12000000, stock: 3, image: "https://picsum.photos/200/120?1" },
    { name: "Headphone", price: 250000, stock: 0, image: "https://picsum.photos/200/120?2" },
    { name: "Keyboard", price: 350000, stock: 5, image: "https://picsum.photos/200/120?3" },
    { name: "Mouse", price: 150000, stock: 2, image: "https://picsum.photos/200/120?4" },
  ]);

  // ================== STATE FORM USER ==================
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", avatar: "" });

  // Form user
  const handleAddUserClick = () => {
    setShowForm(true);
    setEditingIndex(null);
    setNewUser({ name: "", email: "", role: "", avatar: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewUser({ ...newUser, avatar: imageUrl });
    }
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Lengkapi semua data pengguna!");
      return;
    }

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = { ...users[editingIndex], ...newUser };
      setUsers(updatedUsers);
    } else {
      const newUserData = {
        ...newUser,
        avatar: newUser.avatar || "https://i.pravatar.cc/100?u=" + Date.now(),
      };
      setUsers([...users, newUserData]);
    }

    setNewUser({ name: "", email: "", role: "", avatar: "" });
    setShowForm(false);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const userToEdit = users[index];
    setNewUser({ name: userToEdit.name, email: userToEdit.email, role: userToEdit.role, avatar: userToEdit.avatar });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  };

  // ================== STATE FORM PRODUK ==================
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: "" });

  // Tambah produk
  const handleAddProductClick = () => {
    setShowProductForm(true);
    setEditingProductIndex(null);
    setNewProduct({ name: "", price: "", stock: "", image: "" });
  };

  // Ubah input produk
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Upload gambar produk
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  // Simpan produk
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price === "" || newProduct.stock === "") {
      alert("Lengkapi nama, harga, dan stok!");
      return;
    }

    const productData = {
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      image: newProduct.image || "https://picsum.photos/200/120?random=" + Date.now(),
    };

    if (editingProductIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingProductIndex] = productData;
      setProducts(updatedProducts);
    } else {
      setProducts([...products, productData]);
    }

    setNewProduct({ name: "", price: "", stock: "", image: "" });
    setShowProductForm(false);
    setEditingProductIndex(null);
  };

  // Edit produk
  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setNewProduct({
      name: productToEdit.name,
      price: productToEdit.price,
      stock: productToEdit.stock,
      image: productToEdit.image,
    });
    setEditingProductIndex(index);
    setShowProductForm(true);
  };

  // Hapus produk
  const handleDeleteProduct = (index) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const updated = products.filter((_, i) => i !== index);
      setProducts(updated);
    }
  };

  return (
    <div className="app">
      {/* ✅ Background Video Tetap */}
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/video-bg.mp4" type="video/mp4" />
      </video>

      <div className="content-overlay">
        <Header title="Praktik Pertemuan 3 - React Components" />

        {/* ====== MANAJEMEN PENGGUNA ====== */}
        <section className="user-management">
          <h2 className="section-title">Manajemen Pengguna</h2>

          <div className="user-section">
            {users.map((user, index) => (
              <UserCard
                key={index}
                name={user.name}
                email={user.email}
                role={user.role}
                avatar={user.avatar}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>

          <div className="button-section center-button">
            {!showForm && <Button label="Tambah Pengguna" onClick={handleAddUserClick} />}
          </div>

          {showForm && (
            <form className="user-form" onSubmit={handleSaveUser}>
              <input type="text" name="name" placeholder="Nama pengguna" value={newUser.name} onChange={handleChange} />
              <input
                type="email"
                name="email"
                placeholder="Email pengguna"
                value={newUser.email}
                onChange={handleChange}
              />
              <select name="role" value={newUser.role} onChange={handleChange}>
                <option value="">-- Pilih Peran --</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Dosen">Dosen</option>
                <option value="Mahasiswa">Mahasiswa</option>
              </select>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              <button type="submit" className="custom-button">
                {editingIndex !== null ? "Simpan Perubahan" : "Simpan"}
              </button>
            </form>
          )}
        </section>

        {/* ====== KATALOG PRODUK ====== */}
        <section className="product-management">
          <h2 className="section-title">Katalog Produk</h2>
          <div className="product-section">
            <ProductList
              products={products}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>

          <div className="button-section center-button">
            {!showProductForm && <Button label="Tambah Produk" onClick={handleAddProductClick} />}
          </div>

          {showProductForm && (
            <form className="user-form" onSubmit={handleSaveProduct}>
              <input type="text" name="name" placeholder="Nama produk" value={newProduct.name} onChange={handleProductChange} />
              <input type="number" name="price" placeholder="Harga" value={newProduct.price} onChange={handleProductChange} />
              <input type="number" name="stock" placeholder="Stok" value={newProduct.stock} onChange={handleProductChange} />
              <input type="file" accept="image/*" onChange={handleProductImageUpload} />
              <button type="submit" className="custom-button">
                {editingProductIndex !== null ? "Simpan Perubahan" : "Simpan"}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
