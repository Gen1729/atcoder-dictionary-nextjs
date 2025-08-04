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
  const [showTagOptions, setShowTagOptions] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [isSaving,setIsSaving] = useState<boolean>(false);

  const deleteThisTag = (tag:string) => {
    if(showTagOptions)return
    const filteredList = nowTagList.filter((item :string) => item != tag)
    setNowTagList(filteredList)
    setIsEdited(true)
  }

  const saveTag = async () => {
    setIsEdited(false)
    setIsSaving(true)
    const params = new URLSearchParams();
    nowTagList.forEach((tag:string) => params.append('tags', tag));

    try {
      const response = await fetch(`/api/updatetags/${id}?${params.toString()}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        const updatedTags = data.tags ? data.tags.split(',') : [];
        setNowTagList(updatedTags);
        setIsEdited(false);
      } else {
        console.error('タグ更新に失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
    setIsSaving(false);
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
    setIsEdited(true);
  }

  useEffect(() => {
    setNowTagList(tags)
  },[tags])

  return (
    <>
      {!isSaving && nowTagList.map((tag, index) => (
        <span key={index} className="bg-fuchsia-100 border-2 border-fuchsia-300 rounded-md px-[5px] py-[2px] mx-[2px]">{tag} <button onClick={() => deleteThisTag(tag)} className="text-red-900"> × </button></span>
      ))}
      {!showTagOptions && !isSaving && <span className="mx-[5px]"><button onClick={addNewTag} className="text-black">+</button></span>}
      {!showTagOptions && isEdited && <button onClick={saveTag} className="bg-blue-200 border-2 border-blue-300 rounded px-[5px] mx-[2px] hover:bg-blue-300">タグを保存</button>}
      {isSaving && 
        <span className="gap-x-1 flex justify-center items-center inline-flex mx-[10px]">
          <span
            className="w-3 h-3 bg-[#d991c2] animate-pulse rounded-full animate-bounce inline-block"
          />
          <span
            className="w-3 animate-pulse h-3 bg-[#9869b8] rounded-full animate-bounce inline-block"
          ></span>
          <span
            className="w-3 h-3 animate-pulse bg-[#6756cc] rounded-full animate-bounce inline-block"
          ></span>
        </span>
       }
      {!isSaving && showTagOptions && (
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