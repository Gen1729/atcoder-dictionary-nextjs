'use client'
import { useEffect, useState } from 'react';
import { Loading } from './skeleton';

type Problem = {
  id: number;
  contestType: string;
  contestId: number;
  level: string;
  difficulty: number;
  url: string;
  tags: string;
};

type Level = Record<string, boolean>;
type Tag = Record<string, boolean>;

export default function Problems({
  minDiff,
  maxDiff,
  problemLevels,
  tags,
}: {
  minDiff: number;
  maxDiff: number;
  problemLevels: Level;
  tags: Tag;
}) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const selectedLevels = Object.entries(problemLevels)
      .filter(([, value]) => value)
      .map(([key]) => key);
    const selectedTags = Object.entries(tags)
      .filter(([, value]) => value)
      .map(([key]) => key);

    const params = new URLSearchParams();
    params.append('minDiff', String(minDiff));
    params.append('maxDiff', String(maxDiff));
    selectedLevels.forEach(level => params.append('levels', level));
    selectedTags.forEach(tag => params.append('tags', tag));

    fetch(`/api/problems?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProblems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [minDiff, maxDiff, problemLevels, tags]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {problems.map(problem => (
        <div key={problem.id}>
          <div>ID: {problem.id}</div>
          <div>Type: {problem.contestType}</div>
          <div>Number: {problem.contestId}</div>
          <div>Problem: {problem.level}</div>
          <div>Difficulty: {problem.difficulty}</div>
          <div>URL: {problem.url}</div>
          <div>Tags: {problem.tags}</div>
        </div>
      ))}
    </div>
  );
}
