'use client'
import { useEffect, useState } from 'react';
import { Loading } from './skeleton';
import TagsUI from './tag';
import CommentUI from './comment';

type Problem = {
  id: number;
  contestType: string;
  contestId: number;
  level: string;
  title: string;
  difficulty: number;
  url: string;
  tags: string;
  comment: string;
};

type Level = Record<string, boolean>;
type Tag = Record<string, boolean>;

export default function Problems({
  minDiff,
  maxDiff,
  minContestId,
  maxContestId,
  problemLevels,
  tags,
  allTags
}: {
  minDiff: number;
  maxDiff: number;
  minContestId: number;
  maxContestId: number;
  problemLevels: Level;
  tags: Tag;
  allTags: string[];
}) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentValue, setEditingCommentValue] = useState<string>('');
  const [isEdittingComment, setIsEditingComment] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true);
    let selectedLevels = Object.entries(problemLevels)
      .filter(([, value]) => value)
      .map(([key]) => key);
    const selectedTags = Object.entries(tags)
      .filter(([, value]) => value)
      .map(([key]) => key);

    if(selectedLevels.length == 0){
      selectedLevels = Object.entries(problemLevels)
        .map(([key]) => key);
    }

    const params = new URLSearchParams();
    params.append('minDiff', String(minDiff));
    params.append('maxDiff', String(maxDiff));
    params.append('minContestId', String(minContestId));
    params.append('maxContestId', String(maxContestId));
    selectedLevels.forEach(level => params.append('levels', level));
    selectedTags.forEach(tag => params.append('tags', tag));

    fetch(`/api/problems?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [minDiff, maxDiff, minContestId, maxContestId, problemLevels, tags, allTags]);

  if (loading) {
    return <Loading />;
  }
  
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 400) return 'text-zinc-500';
    if (difficulty < 800) return 'text-yellow-800';
    if (difficulty < 1200) return 'text-green-800';
    if (difficulty < 1600) return 'text-cyan-500';
    if (difficulty < 2000) return 'text-blue-700';
    if (difficulty < 2400) return 'text-yellow-500';
    if (difficulty < 2800) return 'text-orange-500';
    return 'text-red-600';
  };

  problems.sort((a, b) => a.id - b.id);

  const grouped = problems.reduce((acc, problem) => {
    const key = `${problem.contestType}${problem.contestId}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(problem);
    return acc;
  }, {} as Record<string, Problem[]>);


  // コメント編集開始
  const handleCommentClick = (problemId: number, currentComment: string) => {
    if(isEdittingComment) return;
    setIsEditingComment(true);
    setEditingCommentId(problemId);
    setEditingCommentValue(currentComment);
  };

  // コメント編集完了（Enter押下）
  const handleCommentInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, problemId: number) => {
    if (e.key === 'Enter') {
      setProblems(prev => prev.map(p => p.id === problemId ? { ...p, comment: editingCommentValue } : p));
      setEditingCommentId(null);
      setIsEditingComment(false);
      try {
        await fetch(`/api/updatecomment/${problemId}`, { method: 'POST', body: JSON.stringify({ comment: editingCommentValue }) });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {Object.entries(grouped).map(([key, group]) => (
        <div key={key} className="mb-4">
          <div className="font-bold text-[30px]">{group[0].contestType}{group[0].contestId}</div>
          {group.map(problem => {
            const tagList = problem.tags ? problem.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
            return (
              <div key={problem.id} className="mb-[5px] text-[20px] bg-white border-2 border-black p-[3px] w-max">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href={problem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span className={getDifficultyColor(problem.difficulty)}>{problem.title}</span>
                    <span className={getDifficultyColor(problem.difficulty)}>| Difficulty : {problem.difficulty}</span>
                  </a>
                  <TagsUI id={problem.id} tags={tagList} allTags={allTags} />
                  <CommentUI onCommentClick={() => handleCommentClick(problem.id, problem.comment || '')} />
                </div>
                <div className="text-[20px] ml-[10px] mt-1">
                  {editingCommentId === problem.id ? (
                    <input
                      type="text"
                      className="border-2 rounded px-2 py-1 w-full"
                      value={editingCommentValue}
                      autoFocus
                      onChange={e => setEditingCommentValue(e.target.value)}
                      onKeyDown={e => handleCommentInputKeyDown(e, problem.id)}
                      onBlur={() => setEditingCommentId(null)}
                    />
                  ) : (
                    problem.comment && (
                      <span className="text-[20px] ml-[10px]">
                        {problem.comment}
                      </span>
                    )
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  );
}