import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, ShieldCheck, X, Edit2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    verified: true
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setReviewData({ name: '', role: '', text: '', rating: 5, verified: true });
    setIsModalOpen(true);
  };

  const openEditModal = (rev: any) => {
    setEditingId(rev._id);
    setReviewData({
      name: rev.name,
      role: rev.role,
      text: rev.text,
      rating: rev.rating,
      verified: rev.verified
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${editingId}`, reviewData);
        toast.success('Review successfully updated!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reviews`, reviewData);
        toast.success('Review successfully added!');
      }
      setIsModalOpen(false);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error(editingId ? 'Failed to update review.' : 'Failed to add review.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/${id}`);
      toast.success('Review deleted');
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Manage Client Reviews</h2>
          <p className="text-sm text-gray-500 font-medium">Add or edit feedback from your clients to show on the portfolio.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-black text-white font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Create Review
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-none p-8 w-full max-w-lg relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                  {editingId ? <Edit2 className="w-4 h-4 text-yellow-500" /> : <Star className="w-4 h-4 text-yellow-500" />}
                </div>
                <h3 className="text-2xl font-black text-black">{editingId ? 'Edit Review' : 'New Review'}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Client Name *</label>
                  <input required type="text" value={reviewData.name} onChange={e => setReviewData({...reviewData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. John Doe" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Client Role/Company *</label>
                  <input required type="text" value={reviewData.role} onChange={e => setReviewData({...reviewData, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black transition-all" placeholder="e.g. CEO of TechCorp" />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Review Text *</label>
                  <textarea required value={reviewData.text} onChange={e => setReviewData({...reviewData, text: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-none py-3 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-black h-32 resize-none transition-all" placeholder="What did the client say about your work?" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-none border border-gray-200">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Rating (Out of 5)</label>
                    <input type="number" min="1" max="5" value={reviewData.rating} onChange={e => setReviewData({...reviewData, rating: Number(e.target.value)})} className="w-20 bg-white border border-gray-200 rounded-none py-2 px-3 outline-none focus:border-black focus:ring-1 focus:ring-black text-sm text-center text-black" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="verified" checked={reviewData.verified} onChange={e => setReviewData({...reviewData, verified: e.target.checked})} className="w-4 h-4 accent-black" />
                    <label htmlFor="verified" className="text-sm font-bold text-black cursor-pointer">Show Verified Badge</label>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold uppercase py-4 rounded-none hover:bg-gray-800 transition-colors mt-8 shadow-md disabled:opacity-50">
                  {loading ? 'Saving...' : (editingId ? 'Save Changes' : 'Save Review')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-400 text-sm font-bold uppercase">No reviews added yet.</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="bg-white border border-gray-200 rounded-3xl p-6 relative group hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openEditModal(rev)}
                  className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors shadow-sm"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(rev._id)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-1 mb-4 bg-gray-50 w-fit px-3 py-1.5 rounded-full border border-gray-100 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>

              <p className="text-sm text-gray-600 italic mb-6 line-clamp-4 leading-relaxed font-medium">"{rev.text}"</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <div>
                  <h4 className="text-sm font-black text-black">{rev.name}</h4>
                  <p className="text-xs font-medium text-gray-500">{rev.role}</p>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-green-600 px-2 py-1 bg-green-50 rounded-lg border border-green-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
