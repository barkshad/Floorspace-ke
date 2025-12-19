
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Image as ImageIcon, 
  Star, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles,
  Search,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  Loader2
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { 
  fetchProducts, 
  saveProduct, 
  removeProduct, 
  getSiteConfig, 
  updateSiteConfig,
  fetchGallery,
  saveGalleryItem
} from '../../lib/adminActions';
import { Product, SiteConfig, GalleryImage } from '../../types';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'config' | 'gallery'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // AI Assistant for Content using Gemini API
  const generateDescription = async (productName: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a 2-sentence marketing description for a flooring product named "${productName}". Make it professional and highlight durability for a Kenyan home.`,
      });
      return response.text;
    } catch (err) {
      console.error("AI Generation Error:", err);
      return "Unable to generate AI description at this time.";
    }
  };

  useEffect(() => {
    const checkAuth = auth.onAuthStateChanged(user => {
      if (!user) navigate('/admin/login');
    });
    loadData();
    return () => checkAuth();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, c, g] = await Promise.all([fetchProducts(), getSiteConfig(), fetchGallery()]);
      setProducts(p);
      setConfig(c);
      setGallery(g);
    } catch (err: any) {
      console.error("Data load error:", err);
      if (err.code === 'permission-denied') {
        setError("Access Denied: Please check your Firestore Security Rules in the Firebase Console.");
      } else {
        setError("Failed to load data. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => signOut(auth).then(() => navigate('/'));

  const MenuLink = ({ id, icon: Icon, label }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id ? 'bg-wood text-white shadow-lg shadow-wood/20' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-bold">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r w-72 p-6 flex flex-col transition-all ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-wood text-white w-8 h-8 rounded flex items-center justify-center font-bold">FS</div>
            <span className="font-bold text-gray-800">Admin Portal</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X /></button>
        </div>

        <div className="space-y-2 grow">
          <MenuLink id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <MenuLink id="products" icon={Package} label="Products" />
          <MenuLink id="gallery" icon={ImageIcon} label="Gallery" />
          <MenuLink id="config" icon={Settings} label="Site Config" />
        </div>

        <button 
          onClick={handleSignOut}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="grow p-4 lg:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-500">Welcome back, Admin</p>
          </div>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4 animate-in slide-in-from-top duration-300">
            <AlertCircle size={24} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="animate-spin text-wood" size={48} />
            <p className="text-gray-400 font-medium">Synchronizing with Firestore...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'dashboard' && <DashboardView products={products} config={config} />}
            {activeTab === 'products' && <ProductManager products={products} onRefresh={loadData} generateAI={generateDescription} />}
            {activeTab === 'config' && <ConfigManager config={config} onRefresh={loadData} />}
            {activeTab === 'gallery' && <GalleryManager gallery={gallery} onRefresh={loadData} />}
          </div>
        )}
      </main>
    </div>
  );
};

// View Components
const DashboardView = ({ products, config }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Total Products</p>
      <h3 className="text-4xl font-black text-wood">{products.length}</h3>
    </div>
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Main Contact</p>
      <h3 className="text-xl font-bold text-gray-800">{config?.phone || 'Not Set'}</h3>
    </div>
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
       <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Site Status</p>
       <div className="flex items-center gap-2 text-green-600 font-bold">
          <CheckCircle size={20} />
          <span>Live & Healthy</span>
       </div>
    </div>
  </div>
);

const ProductManager = ({ products, onRefresh, generateAI }: any) => {
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({ name: '', price: '', category: 'LVT Flooring', description: '', features: [], status: 'available' });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProduct(form, file || undefined);
      setEditing(null);
      setForm({ name: '', price: '', category: 'LVT Flooring', description: '', features: [], status: 'available' });
      onRefresh();
    } catch (err) {
      alert("Error saving product. Check permissions.");
    } finally {
      setSaving(false);
    }
  };

  const aiFill = async () => {
    if (!form.name) return alert("Please enter a product name first.");
    setSaving(true);
    const desc = await generateAI(form.name);
    setForm({ ...form, description: desc });
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Manage Products</h2>
        {!editing && (
          <button onClick={() => setEditing('new')} className="bg-wood text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg">
            <Plus size={18} /> Add Product
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input 
              placeholder="Product Name" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
            />
            <input 
              placeholder="Price (e.g. Ksh 2,500 per sqm)" 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              required
            />
            <select 
              className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood"
              value={form.category}
              onChange={e => setForm({...form, category: e.target.value})}
            >
              <option>LVT Flooring</option>
              <option>SPC Flooring</option>
              <option>Artificial Turf</option>
              <option>Wallpapers & PVC</option>
            </select>
            <input 
              type="file" 
              className="w-full p-3 bg-gray-50 rounded-xl border"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="relative mb-6">
            <textarea 
              placeholder="Description" 
              className="w-full p-4 bg-gray-50 rounded-xl h-32 outline-none border focus:border-wood"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              required
            ></textarea>
            <button 
              type="button"
              onClick={aiFill}
              className="absolute top-4 right-4 text-wood hover:text-[#6F4B30] flex items-center gap-1 font-bold bg-white px-3 py-1 rounded-lg border shadow-sm text-xs"
            >
              <Sparkles size={14} /> AI Write
            </button>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="bg-wood text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2">
              {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Product
            </button>
            <button type="button" onClick={() => setEditing(null)} className="text-gray-500 font-bold px-10 py-4">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4 group">
            <img src={p.image} className="w-16 h-16 rounded-lg object-cover" />
            <div className="grow">
              <h4 className="font-bold text-gray-800">{p.name}</h4>
              <p className="text-xs text-wood font-bold">{p.price}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => { setForm(p); setEditing(p.id); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Settings size={18} /></button>
               <button onClick={async () => { if(confirm('Delete?')){ await removeProduct(p.id); onRefresh(); }}} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConfigManager = ({ config, onRefresh }: any) => {
  const [form, setForm] = useState<any>(config || {});
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteConfig(form);
      onRefresh();
      alert("Site updated!");
    } catch (err) {
      alert("Error updating config. Check permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSave} className="bg-white p-10 rounded-3xl shadow-sm border space-y-8">
        <section>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Home Page Hero</h3>
          <div className="grid gap-4">
             <input value={form.heroTitle || ''} onChange={e => setForm({...form, heroTitle: e.target.value})} placeholder="Hero Title" className="w-full p-4 bg-gray-50 rounded-xl border" />
             <textarea value={form.heroSubtitle || ''} onChange={e => setForm({...form, heroSubtitle: e.target.value})} placeholder="Hero Subtitle" className="w-full p-4 bg-gray-50 rounded-xl border h-24" />
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
             <input value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone" className="w-full p-4 bg-gray-50 rounded-xl border" />
             <input value={form.whatsapp || ''} onChange={e => setForm({...form, whatsapp: e.target.value})} placeholder="WhatsApp Number" className="w-full p-4 bg-gray-50 rounded-xl border" />
             <input value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" className="w-full p-4 bg-gray-50 rounded-xl border" />
             <input value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} placeholder="Address" className="w-full p-4 bg-gray-50 rounded-xl border col-span-full" />
          </div>
        </section>

        <button type="submit" disabled={saving} className="bg-wood text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 w-full justify-center">
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Update Website Content
        </button>
      </form>
    </div>
  );
};

const GalleryManager = ({ gallery, onRefresh }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('LVT');
  const [saving, setSaving] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setSaving(true);
    try {
      await saveGalleryItem({ title, category: cat }, file);
      setFile(null);
      setTitle('');
      onRefresh();
    } catch (err) {
      alert("Error uploading gallery item.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-3xl border shadow-sm">
        <h3 className="font-bold mb-6">Upload Installation Photo/Video</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <input placeholder="Title (e.g. Syokimau Living Room)" className="p-4 bg-gray-50 rounded-xl border" value={title} onChange={e => setTitle(e.target.value)} />
           <select className="p-4 bg-gray-50 rounded-xl border" value={cat} onChange={e => setCat(e.target.value)}>
              <option>LVT</option>
              <option>SPC</option>
              <option>Turf</option>
           </select>
           <input type="file" className="p-3 bg-gray-50 rounded-xl border" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <button 
          onClick={handleUpload} 
          disabled={saving || !file}
          className="bg-wood text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Plus size={18} />} Upload to Gallery
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((item: any) => (
          <div key={item.id} className="aspect-square rounded-2xl overflow-hidden border">
             <img src={item.url} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
