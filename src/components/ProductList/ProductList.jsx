import React from "react";
import "./ProductList.css";

export default function ProductList({
  products = [],
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((p, idx) => (
          <div className="product-card" key={idx}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <div className="price">
              Rp {Number(p.price).toLocaleString()}
            </div>
            <div style={{ marginBottom: 8, color: "#ccc" }}>
              {p.stock > 0 ? `Stok: ${p.stock}` : "Stok kosong"}
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                className="add-to-cart"
                onClick={() =>
                  alert(`${p.name} ditambahkan ke keranjang (simulasi)`)
                }
                disabled={p.stock <= 0}
              >
                {p.stock > 0 ? "Tambah" : "Habis"}
              </button>

              {/* ✅ Tombol Edit */}
              <button
                className="custom-button"
                style={{ background: "#4eaaff" }}
                onClick={() => onEditProduct && onEditProduct(idx)}
              >
                Edit
              </button>

              {/* ✅ Tombol Hapus */}
              <button
                className="delete-btn"
                style={{ background: "#dc3545", color: "#fff" }}
                onClick={() => onDeleteProduct && onDeleteProduct(idx)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
