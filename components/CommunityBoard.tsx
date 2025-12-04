
import React, { useState } from 'react';
import { MessageSquare, Heart, Send, MoreHorizontal, User } from 'lucide-react';
import { CommunityPost } from '../types';

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface ExtendedPost extends CommunityPost {
  isLiked: boolean;
  commentsList: Comment[];
}

const CommunityBoard: React.FC = () => {
  const [posts, setPosts] = useState<ExtendedPost[]>([
    {
      id: 1,
      author: '느린거북이',
      content: '오늘 처음으로 카페에 가서 주문했어요. 별 거 아닌데 손이 떨렸지만 해냈습니다!',
      likes: 45,
      comments: 2,
      tag: '성공일기',
      timestamp: '10분 전',
      isLiked: false,
      commentsList: [
        { id: 101, author: '응원요정', text: '와 정말 대단해요! 시작이 반이죠.', timestamp: '5분 전' },
        { id: 102, author: '지나가던행인', text: '저도 내일 도전해봐야겠어요.', timestamp: '1분 전' }
      ]
    },
    {
      id: 2,
      author: '구름이',
      content: '다들 무기력할 때 어떻게 극복하시나요? 저는 그냥 하루종일 잤어요 ㅠㅠ',
      likes: 23,
      comments: 1,
      tag: '고민나눔',
      timestamp: '1시간 전',
      isLiked: false,
      commentsList: [
        { id: 201, author: '햇살한스푼', text: '잠도 훌륭한 휴식이에요. 자책하지 마세요!', timestamp: '30분 전' }
      ]
    },
    {
      id: 3,
      author: '햇살한스푼',
      content: '면접 떨어졌지만 맛있는 떡볶이 먹고 기분 풀기로 했습니다. 다들 화이팅!',
      likes: 67,
      comments: 0,
      tag: '응원해요',
      timestamp: '3시간 전',
      isLiked: false,
      commentsList: []
    },
  ]);

  const [input, setInput] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});

  const handlePost = () => {
    if(!input.trim()) return;
    const newPost: ExtendedPost = {
        id: Date.now(),
        author: '나의부캐',
        content: input,
        likes: 0,
        comments: 0,
        tag: '일상',
        timestamp: '방금 전',
        isLiked: false,
        commentsList: []
    };
    setPosts([newPost, ...posts]);
    setInput('');
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId: number) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
    }
  };

  const handleCommentInput = (postId: number, text: string) => {
    setCommentInputs(prev => ({...prev, [postId]: text}));
  };

  const submitComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          author: '나의부캐',
          text: text,
          timestamp: '방금 전'
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [...post.commentsList, newComment]
        };
      }
      return post;
    }));

    setCommentInputs(prev => ({...prev, [postId]: ''}));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100 mb-2">
         <h2 className="text-xl font-bold text-indigo-900 mb-1">소통 광장</h2>
         <p className="text-sm text-indigo-700/70">서로에게 따뜻한 힘이 되어주는 공간입니다.</p>
      </div>

      {/* Write Input */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 flex gap-3 items-center sticky top-[70px] z-20">
         <div className="w-8 h-8 rounded-full bg-stone-200 flex-shrink-0" />
         <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-stone-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 text-stone-700 placeholder-stone-400 transition-all"
            placeholder="따뜻한 이야기를 나눠보세요"
         />
         <button 
           onClick={handlePost}
           disabled={!input.trim()}
           className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 transition-colors"
         >
            <Send size={16} />
         </button>
      </div>

      {/* Post List */}
      <div className="space-y-4 pb-20">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-xs font-bold text-white">
                    {post.author[0]}
                </div>
                <div>
                   <div className="flex items-center gap-2">
                     <span className="font-bold text-sm text-stone-800">{post.author}</span>
                     <span className="text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-md">{post.tag}</span>
                   </div>
                   <span className="text-[10px] text-stone-400">{post.timestamp}</span>
                </div>
              </div>
              <button className="text-stone-300 hover:text-stone-500">
                  <MoreHorizontal size={16} />
              </button>
            </div>
            
            {/* Content */}
            <p className="text-stone-700 text-sm mb-4 leading-relaxed">{post.content}</p>
            
            {/* Actions */}
            <div className="flex items-center gap-4 border-t border-stone-100 pt-3">
               <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors text-xs font-medium ${post.isLiked ? 'text-rose-500' : 'text-stone-400 hover:text-rose-500'}`}
               >
                  <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
                  <span>공감 {post.likes}</span>
               </button>
               <button 
                onClick={() => toggleComments(post.id)}
                className={`flex items-center gap-1.5 transition-colors text-xs font-medium ${expandedPostId === post.id ? 'text-indigo-500' : 'text-stone-400 hover:text-indigo-500'}`}
               >
                  <MessageSquare size={16} />
                  <span>댓글 {post.comments}</span>
               </button>
            </div>

            {/* Comment Section */}
            {expandedPostId === post.id && (
              <div className="mt-4 pt-3 border-t border-stone-100 animate-fade-in">
                {/* Comments List */}
                <div className="space-y-3 mb-4">
                  {post.commentsList.length > 0 ? (
                    post.commentsList.map(comment => (
                      <div key={comment.id} className="flex gap-2 text-sm">
                         <div className="w-6 h-6 rounded-full bg-stone-100 flex-shrink-0 flex items-center justify-center text-[10px] text-stone-500">
                            <User size={12} />
                         </div>
                         <div className="bg-stone-50 rounded-r-xl rounded-bl-xl p-2.5 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="font-bold text-xs text-stone-700">{comment.author}</span>
                               <span className="text-[10px] text-stone-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-stone-600 text-xs">{comment.text}</p>
                         </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs text-stone-400 py-2">아직 댓글이 없어요. 첫 번째 응원을 남겨주세요!</p>
                  )}
                </div>

                {/* Comment Input */}
                <div className="flex gap-2">
                  <input 
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => handleCommentInput(post.id, e.target.value)}
                    placeholder="따뜻한 댓글 남기기..."
                    className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-300"
                    onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)}
                  />
                  <button 
                    onClick={() => submitComment(post.id)}
                    disabled={!commentInputs[post.id]?.trim()}
                    className="bg-stone-800 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-stone-700 disabled:opacity-50"
                  >
                    등록
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoard;
