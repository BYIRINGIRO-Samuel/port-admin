import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add review.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:5001/api/reviews/${id}`);
        toast.success('Review deleted');
        fetchReviews();
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete review.');
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold uppercase mb-2">Manage Client Reviews</h2>
        <p className="text-sm text-white/50">Add feedback from your clients to show on the portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ADD REVIEW FORM */}
        <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 h-fit">
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

            <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Review'}
            </button>
          </form>
        </div>

        {/* EXISTING REVIEWS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold mb-4">Existing Reviews ({reviews.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.length === 0 ? (
              <p className="text-white/40 text-sm py-4">No reviews added yet.</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} className="bg-[#0f0f0f] border border-white/10 rounded-xl p-5 relative group">
                  <button 
                    onClick={() => handleDelete(rev._id)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-white text-white' : 'text-white/20'}`} />
                    ))}
                  </div>

                  <p className="text-sm text-white/70 italic mb-4 line-clamp-4">"{rev.text}"</p>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
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
      </div>
    </div>
  );
}
