import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiFillYoutube, AiOutlineSearch } from 'react-icons/ai';
import { FormEvent, useEffect, useState } from 'react';

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    navigate(`/videos/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header className='w-full flex px-5 py-3 bg-zinc-800 sticky top-0 left-0 z-50'>
      <Link to='/' className='flex items-center text-2xl'>
        <AiFillYoutube className='text-4xl mr-1 text-red-600' />
        <h1 className='font-semibold'>Youtube</h1>
      </Link>
      <form className='flex items-center w-3/6 mx-auto' onSubmit={handleSubmit}>
        <input
          className='w-full rounded-l-full bg-zinc-900 border border-zinc-600 px-4 py-2 outline-none'
          type='text'
          placeholder='search'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='flex items-center justify-center text-2xl w-16 h-full bg-zinc-800 rounded-r-full border border-zinc-600 border-l-0'
          type='submit'
        >
          <AiOutlineSearch />
        </button>
      </form>
    </header>
  );
}
