'use client'

export default function Home() {
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
            }}
          >
            検索
          </button>
          <div className="text-[20px]">
            Difficulty:
            <span><input type="number" className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"/></span>
            ~
            <span><input type="number" className="px-[2px] py-[10px] mx-[10px] h-[20px] w-[80px] bg-white border-2 border-black-500"/></span>
          </div>
          <div className="flex gap-4 text-[20px]">
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              A
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              B
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              C
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              D
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              E
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              F
            </label>
            <label>
              <input type="checkbox" className="mr-2 scale-150" />
              G
            </label>
          </div>
          <div className="text-[20px] py-[30px]">
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              binary search
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              dp
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              DFS
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              BFS
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              Dijkstra
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
              integer
            </label>
            <label className="pr-[10px]">
              <input type="checkbox" className="mr-2 scale-150" />
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
