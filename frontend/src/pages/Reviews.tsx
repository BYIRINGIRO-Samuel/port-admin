import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, ShieldCheck, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      const res = await axios.get('http://localhost:5001/api/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5001/api/reviews', reviewData);
      toast.success('Review successfully added!');
      setReviewData({ name: '', role: '', text: '', rating: 5, verified: true });
      setIsModalOpen(false);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add review.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/reviews/${id}`);
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
          <h2 className="text-2xl font-bold uppercase mb-2">Manage Client Reviews</h2>
          <p className="text-sm text-white/50">Add feedback from your clients to show on the portfolio.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black font-bold uppercase text-xs px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Review
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 w-full max-w-lg relative shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-6">
                <Plus className="w-5 h-5 text-white/50" />
                <h3 className="text-lg font-bold">Add New Review</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Client Name *</label>
                  <input required type="text" value={reviewData.name} onChange={e => setReviewData({...reviewData, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. John Doe" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Client Role/Company *</label>
                  <input required type="text" value={reviewData.role} onChange={e => setReviewData({...reviewData, role: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm" placeholder="e.g. CEO of TechCorp" />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/50 mb-1 block">Review Text *</label>
                  <textarea required value={reviewData.text} onChange={e => setReviewData({...reviewData, text: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 outline-none focus:border-white/50 text-sm h-32 resize-none" placeholder="What did the client say about your work?" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-white/50 mb-1 block">Rating (Out of 5)</label>
                    <input type="number" min="1" max="5" value={reviewData.rating} onChange={e => setReviewData({...reviewData, rating: Number(e.target.value)})} className="w-20 bg-black border border-white/10 rounded-lg py-2 px-3 outline-none focus:border-white/50 text-sm text-center" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" id="verified" checked={reviewData.verified} onChange={e => setReviewData({...reviewData, verified: e.target.checked})} className="w-4 h-4" />
                    <label htmlFor="verified" className="text-sm font-bold text-white/80">Show Verified Badge</label>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-6 disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-xl">
            <p className="text-white/40 text-sm">No reviews added yet.</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 relative group hover:border-white/20 transition-colors">
              <button 
                onClick={() => handleDelete(rev._id)}
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-white text-white' : 'text-white/20'}`} />
                ))}
              </div>

              <p className="text-sm text-white/70 italic mb-4 line-clamp-4">"{rev.text}"</p>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto">
                <div>
                  <h4 className="text-sm font-bold">{rev.name}</h4>
                  <p className="text-xs text-white/40">{rev.role}</p>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-green-500 px-2 py-1 bg-green-500/10 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">Verified</span>
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
