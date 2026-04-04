import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { 
  MapPin, Phone, Clock, Navigation, 
  ExternalLink, Star, Search, Filter, 
  Map as MapIcon, RotateCcw, Truck
} from "lucide-react";

const NearByMedicalStore = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [medicalStores, setMedicalStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(5);

  // Sample data updated for professional look
  const sampleStores = [
    { id: 1, name: "City Medico & Wellness", address: "123 Main St, Downtown", phone: "+91 9876543210", rating: 4.5, openingHours: "09:00 AM - 10:00 PM", lat: 22.5726, lng: 88.3639, delivery: true },
    { id: 2, name: "Apollo Pharmacy", address: "456 Park Avenue, Sector V", phone: "+91 9876543211", rating: 4.8, openingHours: "24/7 Open", lat: 22.5850, lng: 88.4350, delivery: true },
    { id: 3, name: "Suraksha Pharma", address: "789 Broadway, Uptown", phone: "+91 9876543212", rating: 4.2, openingHours: "08:00 AM - 11:00 PM", lat: 22.5100, lng: 88.3900, delivery: false },
  ];

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchNearbyStores(latitude, longitude);
      },
      (error) => {
        setError("Please allow location access to find nearby stores");
        setLoading(false);
      }
    );
  };

  const fetchNearbyStores = (latitude, longitude) => {
    // Simulate API delay
    setTimeout(() => {
      const storesWithDistance = sampleStores.map(store => ({
        ...store,
        distance: calculateDistance(latitude, longitude, store.lat, store.lng)
      }));
      
      const sorted = storesWithDistance
        .filter(s => s.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
      
      setMedicalStores(sorted);
      setLoading(false);
    }, 1000);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
  };

  const openInMaps = (store) => {
    window.open(`https://www.google.com/maps?q=${store.lat},${store.lng}`, '_blank');
  };

  const getDirections = (store) => {
    if (userLocation) {
      window.open(`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${store.lat},${store.lng}`, '_blank');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [radius]);

  return (
    <DashboardLayout role="patient">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Nearby Stores</h2>
          <p className="text-slate-500 font-medium italic flex items-center gap-2">
            <MapPin size={16} className="text-primary"/> Finding pharmacies within your range
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase ml-3">Radius</span>
          <select 
            value={radius} 
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={2}>2 KM</option>
            <option value={5}>5 KM</option>
            <option value={10}>10 KM</option>
            <option value={20}>20 KM</option>
          </select>
          <button onClick={getUserLocation} className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer">
            <RotateCcw size={20}/>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] text-rose-600 font-bold mb-8 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={getUserLocation} className="px-6 py-2 bg-rose-600 text-white rounded-xl text-sm">Retry</button>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
           <p className="text-slate-400 font-bold">Scanning nearby pharmacies...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {medicalStores.length > 0 ? (
            medicalStores.map((store) => (
              <div key={store.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all group relative overflow-hidden">
                {/* Delivery Badge */}
                {store.delivery && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Truck size={12}/> Delivery Ready
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(store.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                      ))}
                      <span className="text-xs font-bold text-slate-400 ml-1">({store.rating})</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 group-hover:text-primary transition-colors">{store.name}</h3>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin size={14}/> {store.address}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Contact</p>
                      <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Phone size={14} className="text-primary"/> {store.phone}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Timing</p>
                      <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Clock size={14} className="text-primary"/> {store.openingHours}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button 
                      onClick={() => getDirections(store)}
                      className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                      <Navigation size={18}/> Get Directions
                    </button>
                    <button 
                      onClick={() => openInMaps(store)}
                      className="px-6 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <MapIcon size={20}/>
                    </button>
                  </div>
                </div>

                {/* Distance Badge */}
                <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white px-6 py-3 rounded-tl-[2rem] font-black text-xs">
                  {store.distance.toFixed(1)} KM AWAY
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-2 text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
               <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-slate-300" size={32}/>
               </div>
               <h3 className="text-xl font-bold text-slate-800">No Stores Found</h3>
               <p className="text-slate-400 mt-2">Try increasing your search radius or refresh your location.</p>
               <button onClick={() => setRadius(20)} className="mt-6 text-primary font-bold hover:underline">Expand Search Radius</button>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default NearByMedicalStore;