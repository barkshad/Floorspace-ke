
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Image as ImageIcon, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  Database,
  ArrowRight,
  ExternalLink,
  // Added missing Menu icon import
  Menu
} from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';
import { doc, setDoc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
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
import { PRODUCTS, GALLERY_IMAGES, CONTACT_INFO } from '../../constants';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'config' | 'gallery'>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // AI Assistant for Content using Gemini API
  const generateDescription = async (productName: string) => {
    try {
      // Re-initialize for each call to ensure latest key is used as per guidelines
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

  const initializeDatabase = async () => {
    setInitializing(true);
    try {
      const batch = writeBatch(db);

      // 1. Seed Config
      const configRef = doc(db, 'siteConfig', 'global');
      batch.set(configRef, {
        heroTitle: "Premium Flooring & Interior Finishes",
        heroSubtitle: "Transform your space with Kenya's most trusted partner for LVT, SPC, Wallpapers & Decor.",
        aboutText: "Based in the heart of the bustling Thika Road...",
        phone: CONTACT_INFO.phone,
        whatsapp: CONTACT_INFO.whatsapp,
        email: CONTACT_INFO.email,
        address: CONTACT_INFO.address,
        facebookUrl: CONTACT_INFO.facebook,
        instagramUrl: CONTACT_INFO.instagram,
        updatedAt: serverTimestamp()
      });

      // 2. Seed Products
      PRODUCTS.forEach((prod) => {
        const pRef = doc(collection(db, 'products'));
        batch.set(pRef, { ...prod, updatedAt: serverTimestamp() });
      });

      // 3. Seed Gallery
      GALLERY_IMAGES.forEach((img) => {
        const gRef = doc(collection(db, 'gallery'));
        batch.set(gRef, { ...img, createdAt: serverTimestamp() });
      });

      await batch.commit();
      await loadData();
      alert("Website successfully connected to Firebase!");
    } catch (err) {
      console.error(err);
      alert("Failed to initialize. Check your Firebase Rules.");
    } finally {
      setInitializing(false);
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
      <aside className={`bg-white border-r w-72 p-6 flex flex-col transition-all fixed lg:relative z-40 h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
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

        <div className="mt-auto space-y-4">
          <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-wood hover:bg-wood/5 font-bold transition-all text-sm">
            <ExternalLink size={18} />
            View Live Site
          </a>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-bold transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="grow p-4 lg:p-10 overflow-y-auto ml-0 lg:ml-0">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            <p className="text-gray-500">Managing Floor Space Interiors Kenya</p>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white rounded-lg shadow-sm">
            <Menu size={24} />
          </button>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl mb-8 flex items-center gap-4 animate-in slide-in-from-top duration-300">
            <AlertCircle size={24} />
            <div>
              <p className="font-bold">Connection Issue</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="animate-spin text-wood" size={48} />
            <p className="text-gray-400 font-medium">Connecting to Firebase Cloud...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'dashboard' && (
              <DashboardView 
                products={products} 
                config={config} 
                onInitialize={initializeDatabase} 
                initializing={initializing} 
              />
            )}
            {/* Added setActiveTab prop to ProductManager */}
            {activeTab === 'products' && <ProductManager products={products} onRefresh={loadData} generateAI={generateDescription} setActiveTab={setActiveTab} />}
            {activeTab === 'config' && <ConfigManager config={config} onRefresh={loadData} />}
            {activeTab === 'gallery' && <GalleryManager gallery={gallery} onRefresh={loadData} />}
          </div>
        )}
      </main>
    </div>
  );
};

const DashboardView = ({ products, config, onInitialize, initializing }: any) => {
  const isDatabaseEmpty = products.length === 0 && !config;

  return (
    <div className="space-y-10">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:border-wood/30 transition-all">
          <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3">Live Inventory</p>
          <div className="flex items-end justify-between">
            <h3 className="text-5xl font-black text-gray-900">{products.length}</h3>
            <div className="bg-wood/10 p-2 rounded-lg text-wood group-hover:scale-110 transition-transform">
              <Package size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Products currently in database</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:border-wood/30 transition-all">
          <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3">Support Contact</p>
          <div className="flex items-end justify-between">
            <h3 className="text-xl font-bold text-gray-800 truncate pr-2">{config?.phone || 'Not Configured'}</h3>
            <div className="bg-blue-50 p-2 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
              <Settings size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Active phone on website</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:border-wood/30 transition-all">
          <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-3">System Health</p>
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle size={32} />
            <h3 className="text-xl font-black uppercase tracking-tight">Active</h3>
          </div>
          <p className="text-gray-500 text-xs mt-4">Real-time sync enabled</p>
        </div>
      </div>

      {/* Initialization Wizard */}
      {isDatabaseEmpty && (
        <div className="bg-wood text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-wood/20">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Database size={240} />
          </div>
          
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} /> New Setup Detected
            </div>
            <h2 className="text-4xl font-black mb-6 leading-tight">Ready to connect your website content?</h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Your Firebase database is currently empty. We can automatically sync the default products and settings from the website code to your live database so you can start editing them immediately.
            </p>
            <button 
              onClick={onInitialize}
              disabled={initializing}
              className="bg-white text-wood px-10 py-5 rounded-2xl font-black flex items-center gap-3 shadow-xl hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
            >
              {initializing ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Syncing Collections...</span>
                </>
              ) : (
                <>
                  <span>Initialize Website Data</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!isDatabaseEmpty && (
        <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center">
           <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Database size={32} />
           </div>
           <h3 className="text-xl font-bold mb-2">Connected to Firebase</h3>
           <p className="text-gray-500 max-w-md mx-auto">
             Your website is successfully linked. Use the sidebar menu to update your products, images, and contact information in real-time.
           </p>
        </div>
      )}
    </div>
  );
};

// Updated ProductManager to accept setActiveTab prop
const ProductManager = ({ products, onRefresh, generateAI, setActiveTab }: any) => {
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Catalog Management</h2>
        {!editing && (
          <button onClick={() => setEditing('new')} className="bg-wood text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-[#6F4B30] transition-all">
            <Plus size={18} /> Add New Item
          </button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Product Name</label>
              <input 
                placeholder="e.g. Luxury Oak LVT" 
                className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood transition-all"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Pricing Info</label>
              <input 
                placeholder="e.g. Ksh 2,500 per sqm" 
                className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood transition-all"
                value={form.price}
                onChange={e => setForm({...form, price: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Category</label>
              <select 
                className="w-full p-4 bg-gray-50 rounded-xl outline-none border focus:border-wood transition-all appearance-none"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option>LVT Flooring</option>
                <option>SPC Flooring</option>
                <option>Artificial Turf</option>
                <option>Wallpapers & PVC</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Thumbnail Image</label>
              <input 
                type="file" 
                className="w-full p-3 bg-gray-50 rounded-xl border file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-wood/10 file:text-wood"
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <div className="relative mb-8">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Marketing Description</label>
            <textarea 
              placeholder="Tell customers about this product..." 
              className="w-full p-4 bg-gray-50 rounded-xl h-32 outline-none border focus:border-wood transition-all"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              required
            ></textarea>
            <button 
              type="button"
              onClick={aiFill}
              className="absolute top-10 right-4 text-wood hover:text-[#6F4B30] flex items-center gap-1 font-bold bg-white px-3 py-1.5 rounded-lg border shadow-sm text-xs transition-all hover:shadow-md"
            >
              <Sparkles size={14} className="text-amber-500" /> AI Write
            </button>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="bg-wood text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-wood/20">
              {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Product
            </button>
            <button type="button" onClick={() => setEditing(null)} className="text-gray-500 font-bold px-10 py-4 hover:bg-gray-50 rounded-xl">Cancel</button>
          </div>
        </form>
      )}

      {products.length === 0 && !editing ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
           <Package size={48} className="mx-auto text-gray-300 mb-4" />
           <p className="text-gray-400 font-medium">No products found in database.</p>
           {/* Fixed missing setActiveTab by passing it from parent component */}
           <button onClick={() => setActiveTab('dashboard')} className="text-wood font-bold mt-2 hover:underline">Go to Dashboard to initialize defaults</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p: any) => (
            <div key={p.id} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex items-center gap-5 group hover:shadow-xl transition-all">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="grow min-w-0">
                <h4 className="font-bold text-gray-900 truncate">{p.name}</h4>
                <p className="text-xs text-wood font-black tracking-tight">{p.price}</p>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase">{p.category}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => { setForm(p); setEditing(p.id); }} className="p-2 text-gray-400 hover:text-wood hover:bg-wood/5 rounded-lg transition-colors"><Settings size={18} /></button>
                 <button onClick={async () => { if(confirm('Delete this product permanently?')){ await removeProduct(p.id); onRefresh(); }}} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ConfigManager = ({ config, onRefresh }: any) => {
  const [form, setForm] = useState<any>(config || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) setForm(config);
  }, [config]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteConfig(form);
      onRefresh();
      alert("Website content updated successfully!");
    } catch (err) {
      alert("Error updating config. Check permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {!config && (
        <div className="bg-amber-50 border border-amber-100 text-amber-700 p-6 rounded-2xl mb-8 flex items-center gap-4">
          <AlertCircle size={24} />
          <p className="font-medium">Site configuration not found. Please initialize on the Dashboard first.</p>
        </div>
      )}
      
      <form onSubmit={handleSave} className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 space-y-10">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-wood/10 text-wood flex items-center justify-center font-bold">1</div>
            <h3 className="text-xl font-bold text-gray-900">Homepage Identity</h3>
          </div>
          <div className="grid gap-6">
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Main Heading (Hero)</label>
                <input value={form.heroTitle || ''} onChange={e => setForm({...form, heroTitle: e.target.value})} placeholder="e.g. Premium Flooring in Kenya" className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood transition-all" />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Sub-heading Text</label>
                <textarea value={form.heroSubtitle || ''} onChange={e => setForm({...form, heroSubtitle: e.target.value})} placeholder="The descriptive text under the heading..." className="w-full p-4 bg-gray-50 rounded-2xl border h-24 outline-none focus:border-wood transition-all" />
             </div>
          </div>
        </section>
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center font-bold">2</div>
            <h3 className="text-xl font-bold text-gray-900">Official Contact Channels</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Public Phone Number</label>
                <input value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+254..." className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood" />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">WhatsApp ID (Numbers only)</label>
                <input value={form.whatsapp || ''} onChange={e => setForm({...form, whatsapp: e.target.value})} placeholder="254..." className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood" />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Public Email</label>
                <input value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} placeholder="info@floorspace.com" className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood" />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Business Address</label>
                <input value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} placeholder="Physical location..." className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood col-span-full" />
             </div>
          </div>
        </section>

        <button type="submit" disabled={saving || !config} className="bg-wood text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 w-full justify-center shadow-xl shadow-wood/20 hover:bg-[#6F4B30] transition-all disabled:opacity-50">
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Update Global Settings
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
      alert("Project added to gallery!");
    } catch (err) {
      alert("Error uploading gallery item.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-8">Add Installation Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Project Name</label>
              <input placeholder="e.g. Apartment in Kilimani" className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood transition-all" value={title} onChange={e => setTitle(e.target.value)} />
           </div>
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Category</label>
              <select className="w-full p-4 bg-gray-50 rounded-2xl border outline-none focus:border-wood transition-all appearance-none" value={cat} onChange={e => setCat(e.target.value)}>
                <option>LVT</option>
                <option>SPC</option>
                <option>Turf</option>
                <option>Wall Decor</option>
              </select>
           </div>
           <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Photo/Video File</label>
              <input type="file" className="w-full p-3 bg-gray-50 rounded-2xl border file:bg-wood/10 file:text-wood file:border-0 file:rounded-lg file:px-4 file:py-1 file:text-xs file:font-bold" onChange={e => setFile(e.target.files?.[0] || null)} />
           </div>
        </div>
        <button 
          onClick={handleUpload} 
          disabled={saving || !file}
          className="bg-wood text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-wood/20 hover:bg-[#6F4B30] transition-all"
        >
          {saving ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add to Showroom
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {gallery.map((item: any) => (
          <div key={item.id} className="aspect-square rounded-[1.5rem] overflow-hidden border border-gray-100 group relative">
             <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-wood/80 rounded-full">{item.category}</p>
             </div>
          </div>
        ))}
      </div>
      
      {gallery.length === 0 && (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
           <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
           <p className="text-gray-400 font-medium">Showroom is empty.</p>
        </div>
      )}
    </div>
  );
}
