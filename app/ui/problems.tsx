import { getProblems } from "../api/actions";

type Problem = {
    id: number;
    contesttype: string;
    contestnumber: number;
    problem: string;
    url: string;
    Tags: string;
};

export default async function getAllProblems() {
    const response = await getProblems();
    const problems: Problem[] = await response.json();

    return (
        <div>
            {problems.map((problem: Problem) => (
                <div key={problem.id}>
                    <div>ID: {problem.id}</div>
                    <div>Type: {problem.contesttype}</div>
                    <div>Number: {problem.contestnumber}</div>
                    <div>Problem: {problem.problem}</div>
                    <div>URL: {problem.url}</div>
                    <div>Tags: {problem.Tags}</div>
                </div>
            ))}
        </div>
    );
}