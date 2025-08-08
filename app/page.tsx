'use client'

import { useEffect, useState } from 'react';
import Problems from './ui/problems';
import { error } from 'console';

export default function Home() {
  // Difficultyのinput値
  const [minDiff, setMinDiff] = useState('0');
  const [maxDiff, setMaxDiff] = useState('3600');
  const [minContestId, setMinContestId] = useState('300');
  const [maxContestId, setMaxContestId] = useState('417');

  type Tags = {
    [key: string]: boolean;
  };

  // 問題ランクのチェックボックス状態
  const [levels, setLevels] = useState<Tags>({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
  });

  const [tags, setTags] = useState<Tags>({});
  const [allTagsState, setAllTagsState] = useState<string[]>([]);

  const [filter, setFilter] = useState({
    minDiff: 0,
    maxDiff: 3600,
    minContestId: 300,
    maxContestId: 417,
    levels: { ...levels },
    tags: { ...tags }
  });

  //難易度ハンドラ
  const handleMinDiffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinDiff(e.target.value);
  }

  const handleMaxDiffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDiff(e.target.value);
  }

  const handleMinContestIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinContestId(e.target.value);
  }

  const handleMaxContestIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxContestId(e.target.value);
  }

  // チェックボックス変更時のハンドラ
  const handleLevelChange = (level: string) => {
    setLevels({ ...levels, [level]: !levels[level as keyof typeof levels] });
  };

  const handleTagChange = (tag: string) => {
    setTags({ ...tags, [tag]: !tags[tag as keyof typeof tags] });
  };

  const makeNewTags = async (tagName: string) => {
    if (!tagName.trim() || allTagsState.includes(tagName))return;
    try {
      await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tagName }),
      });
    } catch (error) {
      console.error('タグの追加に失敗しました:', error);
    }
    setTags({ ...tags, [tagName]: false });
    setAllTagsState([...allTagsState, tagName]);
  }

  const deleteTags = async () => {
    const selectedTags = Object.keys(tags).filter(tag => tags[tag]);
    if (selectedTags.length === 0) return;

    const params = new URLSearchParams();
    selectedTags.forEach(tag => params.append('tags', tag));

    let isOK: boolean = true;

    await fetch(`/api/problems/tagfind?${params.toString()}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        alert('選択したタグが付いている問題が存在します。削除できません。');
        isOK = false;
      }
    })
    .catch(error => {console.error('タグの削除チェックに失敗しました:', error)});

    if(!isOK) return;

    try {
      await fetch('/api/tags', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: selectedTags }),
      });
      setTags(prev => {
        const newTags = { ...prev };
        selectedTags.forEach(tag => delete newTags[tag]);
        return newTags;
      });
      setAllTagsState(allTagsState.filter(tag => !selectedTags.includes(tag)));
    } catch (error) {
      console.error('タグの削除に失敗しました:', error);
    }
  };
 
  useEffect(() => {
    fetch('/api/tags')
      .then(res => res.json())
      .then((data: { id: string; name: string }[]) => {
        const tagsObj: Tags = {};
        const tagNames: string[] = [];
        data.forEach(tag => {
          tagsObj[tag.name] = false;
          tagNames.push(tag.name);
        });
        setTags(tagsObj);
        setAllTagsState(tagNames);
      });
  }, []);

  const onSearch = () => {
    setFilter({
      minDiff: Number(minDiff),
      maxDiff: Number(maxDiff),
      minContestId: Number(minContestId),
      maxContestId: Number(maxContestId),
      levels: { ...levels },
      tags: { ...tags },
    });
  };

  return (
    <div className="flex min-h-screen h-full">
      <div className="w-[500px] bg-blue-200">
        <h1 className="text-[50px] leading-none p-5">Atcoder Dictionary</h1>
        <div className="p-5">
          <button
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded mb-4 transition-colors duration-150 shadow-md"
            onClick={onSearch}
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
          <div className="text-[20px] mb-[30px]">
            ContestId:
            <span>
              <input
                type="number"
                className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"
                value={minContestId}
                onChange={handleMinContestIdChange}
              />
            </span>
            ~
            <span>
              <input
                type="number"
                className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"
                value={maxContestId}
                onChange={handleMaxContestIdChange}
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
          <div className="text-[20px] py-[20px] flex flex-wrap gap-x-4 gap-y-2">
            {Object.keys(tags).map((tag:string) => (
              <label key={tag} className="flex items-center pr-[10px]">
                <input type="checkbox" className="mr-2 scale-150" checked={tags[tag]} onChange={() => handleTagChange(tag)} />
                <span>{tag}</span>
              </label>
            ))}
          </div>
            <div>
              <form className="border-2 border-black-500 rounded p-[10px] w-full"
                action=""
                onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const tagName = formData.get('tagName') as string;
                makeNewTags(tagName);
                form.reset();
                }}
              >
                <div className="flex gap-2 items-center w-full">
                  <input
                  type="text"
                  name="tagName"
                  placeholder="新しいタグ名を入力"
                  className="flex-1 px-[5px] py-[6px] h-[40px] bg-white border-2 rounded border-black-500"
                  />
                  <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-4 py-2 h-[40px] rounded transition-colors duration-150 shadow-md whitespace-nowrap"
                  >
                  新規タグの作成
                  </button>
                </div>
              </form>
                <div className="flex justify-end">
                  <button onClick={deleteTags} className="text-[15px] bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded ml-[10px] my-[10px] transition-colors duration-150 shadow-md">
                    チェックが付いているタグを削除
                  </button>
                </div>
            </div>
        </div>
        <div className="p-[5px]">
          <p>問題を解法で絞り込めるサイトです。</p>
          <p>タグやコメントをつけて解法を共有しましょう。</p>
          <p>荒らしは控え、節度を守って利用して下さい。</p>
          <p className="pt-[10px] font-bold text-red-800">注意：</p>
          <p>Atcoder Problemsが提供しているAPIからDifficultyを取得しており、そのデータ上でDifficultyが負の値になっている問題のDifficultyについては0としています。</p>
          <p>また、Difficultyがない問題も一部あり、それらはDifficultyが-1になっています。</p>
          <p>現在はABC300-417が利用できます。</p>
        </div>
      </div>
      <div className="flex-1 bg-green-100 font-bold pl-[20px] pt-[15px]">
        <Problems
          minDiff={filter.minDiff}
          maxDiff={filter.maxDiff}
          minContestId={filter.minContestId}
          maxContestId={filter.maxContestId}
          problemLevels={filter.levels}
          tags={filter.tags}
          allTags={allTagsState}
        />
      </div>
    </div>
  );
}