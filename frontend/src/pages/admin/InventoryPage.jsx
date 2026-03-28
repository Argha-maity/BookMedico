import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getFullInventory, removeMedicine } from "../../services/inventoryService";
import { Package, Search, ArrowLeft, Edit, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InventoryPage = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadInventory = async () => {
    setLoading(true);
    try {
      const res = await getFullInventory();
      setInventory(res?.inventory || []);
    } catch (err) {
      console.error("Failed to load inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this medicine?")) {
      try {
        await removeMedicine(id);
        setInventory(inventory.filter((item) => item._id !== id));
      } catch (err) {
        alert("Failed to delete medicine");
      }
    }
  };

  // Filter inventory based on search term
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Medicine Inventory</h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by medicine name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 shadow-sm font-medium" 
          />
        </div>
      </div>

      {/* Inventory List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="animate-spin text-primary mb-2" size={32} />
            <p className="text-slate-400 font-bold">Fetching Inventory...</p>
          </div>
        ) : filteredInventory.length > 0 ? (
          filteredInventory.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-xl hover:border-primary/10 transition-all"
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className={`p-4 rounded-2xl transition-colors ${
                  item.stock < 10 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
                }`}>
                  <Package size={24}/>
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-lg leading-tight">{item.name}</h4>
                  <p className="text-[10px] font-black uppercase text-slate-400 mt-1 tracking-wider">
                    {item.category} • Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
                  <p className="text-sm font-black text-slate-800">₹{item.price}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Stock</p>
                  <p className={`text-sm font-black ${item.stock < 10 ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                    {item.stock} Units
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <Edit size={18}/>
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                  >
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No medicines found matching your search.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;