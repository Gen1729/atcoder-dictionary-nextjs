'use client'

import { useState } from 'react';

export default function Home() {

  // Difficultyのinput値
  const [minDiff, setMinDiff] = useState('0');
  const [maxDiff, setMaxDiff] = useState('3600');

  // 問題ランクのチェックボックス状態
  const [levels, setLevels] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
  });

  // タグのチェックボックス状態
  const [tags, setTags] = useState({
    binarySearch: false,
    dp: false,
    DFS: false,
    BFS: false,
    Dijkstra: false,
    integer: false,
    bit2: false,
  });

  //難易度ハンドラ
  const handleMinDiffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinDiff(e.target.value);
  }

  const handleMaxDiffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDiff(e.target.value);
  }

  // チェックボックス変更時のハンドラ
  const handleLevelChange = (level: string) => {
    setLevels({ ...levels, [level]: !levels[level as keyof typeof levels] });
  };

  const handleTagChange = (tag: string) => {
    setTags({ ...tags, [tag]: !tags[tag as keyof typeof tags] });
  };

  return (
    <div className="flex h-screen">
      <div className="w-[400px] bg-blue-200">
        <h1 className="text-[50px] leading-none p-5">Atcoder Dictionary</h1>
        <div className="p-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              // 検索ボタンが押されたときの処理
              alert('検索ボタンが押されました');
              // ここでlevelsやtagsの値を利用できます
              console.log(levels, tags);
            }}
          >
            検索
          </button>
          <div className="text-[20px]">
            Difficulty:
            <span>
              <input
                type="number"
                className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"
                value={minDiff}
                onChange={handleMinDiffChange}
              />
            </span>
            ~
            <span>
              <input
                type="number"
                className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"
                value={maxDiff}
                onChange={handleMaxDiffChange}
              />
            </span>
          </div>
          <div className="flex gap-4 text-[20px]">
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.A} onChange={() => handleLevelChange('A')} />
              A
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.B} onChange={() => handleLevelChange('B')} />
              B
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.C} onChange={() => handleLevelChange('C')} />
              C
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.D} onChange={() => handleLevelChange('D')} />
              D
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.E} onChange={() => handleLevelChange('E')} />
              E
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.F} onChange={() => handleLevelChange('F')} />
              F
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" checked={levels.G} onChange={() => handleLevelChange('G')} />
              G
            </label>
          </div>
          <div className="text-[20px] py-[30px]">
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.binarySearch} onChange={() => handleTagChange('binarySearch')} />
              binary search
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.dp} onChange={() => handleTagChange('dp')} />
              dp
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.DFS} onChange={() => handleTagChange('DFS')} />
              DFS
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.BFS} onChange={() => handleTagChange('BFS')} />
              BFS
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.Dijkstra} onChange={() => handleTagChange('Dijkstra')} />
              Dijkstra
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.integer} onChange={() => handleTagChange('integer')} />
              integer
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" checked={tags.bit2} onChange={() => handleTagChange('bit2')} />
              2bit
            </label>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-green-200">
        右側のコンテンツ
      </div>
    </div>
  );
}