'use client'
import allTags from '@/public/ tagCatalog';
import { useEffect, useState } from 'react';

export default function Tag({
  id,
  tags
}:{
  id:number;
  tags:string[];
}){
  const [nowTagList, setNowTagList] = useState<string[]>([])
  const [showTagOptions, setShowTagOptions] = useState(false);

  const deleteThisTag = (tag:string) => {
    if(showTagOptions)return
    const filteredList = nowTagList.filter((item :string) => item != tag)
    setNowTagList(filteredList)
  }

  const saveTag = () => {
    //TODO　API叩く
    if(id == 1)return
    return
  }

  const addNewTag = () => {
    setShowTagOptions(true);
  }

  const handleSelectTag = (tag: string) => {
    if(tag == 'CANCEL'){
      setShowTagOptions(false);
      return;
    }
    if (!nowTagList.includes(tag)) {
      setNowTagList([...nowTagList, tag]);
    }
    setShowTagOptions(false);
  }

  useEffect(() => {
    setNowTagList(tags)
  },[tags])

  return (
    <>
      {nowTagList.map((tag, index) => (
        <span key={index} className="bg-fuchsia-100 border-2 border-fuchsia-300 rounded-md px-[5px] py-[2px] mx-[2px]">{tag} <button onClick={() => deleteThisTag(tag)} className="text-red-900"> × </button></span>
      ))}
      {!showTagOptions && <span className="mx-[5px]"><button onClick={addNewTag} className="text-black">+</button></span>}
      {!showTagOptions && tags != nowTagList && <button onClick={saveTag}className="bg-blue-200 border-2 border-blue-300 rounded px-[5px] mx-[2px] hover:bg-blue-300">タグを保存</button>}
      {showTagOptions && (
        <div className="mt-1 p-2 bg-white border rounded shadow">
          <button className="mx-1 px-2 bg-red-100 border-2 border-red-300 rounded hover:bg-red-300" onClick={() => handleSelectTag('CANCEL')}>CANCEL</button>
          {allTags.filter(tag => !nowTagList.includes(tag)).map((tag, idx) => (
            <button key={idx} className="mx-1 px-2 bg-fuchsia-100 border-2 border-fuchsia-300 rounded hover:bg-fuchsia-300" onClick={() => handleSelectTag(tag)}>{tag}</button>
          ))}
        </div>
      )}
    </>
  )
}