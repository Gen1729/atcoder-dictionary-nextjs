'use client'
import { useEffect, useState } from 'react';
import { Loading } from './skeleton';

type Problem = {
  id: number;
  contestType: string;
  contestId: number;
  level: string;
  title: string;
  difficulty: number;
  url: string;
  tags: string;
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
}: {
  minDiff: number;
  maxDiff: number;
  minContestId: number;
  maxContestId: number;
  problemLevels: Level;
  tags: Tag;
}) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  }, [minDiff, maxDiff, minContestId, maxContestId, problemLevels, tags]);

  if (loading) {
    return <Loading />;
  }
  // difficulty値に応じて色を返す関数
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

  return (
    <div>
      {problems.map(problem => (
        <div key={problem.id} className="mb-[5px]">
          ・
          <a href={problem.url} target="_blank" rel="noopener noreferrer" className={getDifficultyColor(problem.difficulty)}>
            {problem.contestType}{problem.contestId} | {problem.title} | Difficulty:{problem.difficulty} | {problem.tags}
          </a>
        </div>
      ))}
    </div>
  );
}
