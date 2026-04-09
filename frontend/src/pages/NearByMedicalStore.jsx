import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { getProfile } from "../services/auth"; 
import { 
  MapPin, Phone, Clock, Navigation, 
  Star, Map as MapIcon, RotateCcw, Truck,
  Share2, MessageSquare
} from "lucide-react";

const NearByMedicalStore = () => {
  const [user, setUser] = useState(null); // To track if it's a Doctor or Patient
  const [userLocation, setUserLocation] = useState(null);
  const [medicalStores, setMedicalStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(5);

  const sampleStores = [
    { id: 1, name: "City Medico & Wellness", address: "123 Main St, Downtown", phone: "+91 9876543210", rating: 4.5, openingHours: "09:00 AM - 10:00 PM", lat: 22.5726, lng: 88.3639, delivery: true },
    { id: 2, name: "Apollo Pharmacy", address: "456 Park Avenue, Sector V", phone: "+91 9876543211", rating: 4.8, openingHours: "24/7 Open", lat: 22.5850, lng: 88.4350, delivery: true },
    { id: 3, name: "Suraksha Pharma", address: "789 Broadway, Uptown", phone: "+91 9876543212", rating: 4.2, openingHours: "08:00 AM - 11:00 PM", lat: 22.5100, lng: 88.3900, delivery: false },
  ];

  useEffect(() => {
    const fetchUserAndLocation = async () => {
      try {
        const res = await getProfile();
        setUser(res.data); // Stores the user object (contains role)
        getUserLocation();
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    fetchUserAndLocation();
  }, [radius]);

  const getUserLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchNearbyStores(latitude, longitude);
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  };

  const fetchNearbyStores = (lat, lng) => {
    setTimeout(() => {
      const storesWithDist = sampleStores.map(s => ({
        ...s,
        distance: calculateDistance(lat, lng, s.lat, s.lng)
      }));
      setMedicalStores(storesWithDist.filter(s => s.distance <= radius).sort((a,b) => a.distance - b.distance));
      setLoading(false);
    }, 800);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  return (
    <DashboardLayout role={user?.role || "patient"}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Pharmacy Locator</h2>
          <p className="text-slate-500 font-medium italic">
            {user?.role === "doctor" 
              ? "Recommend nearby pharmacies to your patients" 
              : "Find the nearest medical stores for your prescriptions"}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase ml-3">Range</span>
          <select 
            value={radius} 
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={5}>5 KM</option>
            <option value={10}>10 KM</option>
            <option value={20}>20 KM</option>
          </select>
          <button onClick={getUserLocation} className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
            <RotateCcw size={20}/>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 bg-white rounded-[3rem] border border-slate-100">
           <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
           <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Mapping Nearby Stores...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {medicalStores.map((store) => (
            <div key={store.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden">
              {store.delivery && (
                <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Truck size={12}/> Home Delivery
                </div>
              )}

              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-400">{store.rating} Rating</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">{store.name}</h3>
                  <p className="text-sm font-medium text-slate-400 flex items-center gap-1">
                    <MapPin size={14}/> {store.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Contact</p>
                    <p className="text-sm font-bold text-slate-700">{store.phone}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-transparent">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <p className="text-sm font-bold text-slate-700">{store.openingHours}</p>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  {/* DYNAMIC BUTTON BASED ON ROLE */}
                  {user?.role === "doctor" ? (
                    <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                      <Share2 size={18}/> Suggest to Patient
                    </button>
                  ) : (
                    <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
                      <Navigation size={18}/> Get Directions
                    </button>
                  )}
                  
                  <button className="px-6 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all">
                    <MapIcon size={20}/>
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white px-6 py-3 rounded-tl-[2rem] font-black text-xs">
                {store.distance.toFixed(1)} KM
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default NearByMedicalStore;