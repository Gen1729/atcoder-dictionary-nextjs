import { getProblems } from "../api/actions";

type Problem = {
    id: number;
    contestType: string;
    contestId: number;
    level: string;
    difficulty: number;
    url: string;
    tags: string;
};

type Level = {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
    E: boolean;
    F: boolean;
    G: boolean;
};

type Tag = {
    binarySearch: boolean,
    dp: boolean,
    DFS: boolean,
    BFS: boolean,
    Dijkstra: boolean,
    integer: boolean,
    bit2: boolean,
};

export default async function searchProblems({
    minDiff,
    maxDiff,
    problemLevels,
    tags
}:{
    minDiff:number;
    maxDiff:number;
    problemLevels:Level;
    tags:Tag;
}) {
    const selectedLevels = Object.entries(problemLevels)
        .filter(([, value]) => value)
        .map(([key]) => key);

    const selectedTags = Object.entries(tags)
        .filter(([, value]) => value)
        .map(([key]) => key);
    
    
    const response = await getProblems(minDiff,maxDiff,selectedLevels,selectedTags);
    const problems: Problem[] = await response.json();

    return (
        <div>
            {problems.map((problem: Problem) => (
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