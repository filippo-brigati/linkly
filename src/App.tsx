import { useState } from 'react';
import LoadingDonut from './components/LoadingDonuts';
import './App.css';

function App() {
  const [resultUrl, setResultUrl] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setIsCopied] = useState(false);

  const handleChange = (event: any) => {
    setUrl(event.target.value);
  };

  const sendRequest = async () => {
    if (url) {
      setIsLoading(true);
      try {
        fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          body: JSON.stringify({
            "group_guid": "Bl9nkYDGX6X",
            "domain": "bit.ly",
            "long_url": url.toString()
          }),
          headers: {
            'Authorization': 'Bearer ab8c3cafa2fdb273f8c2490c9b3ad38b4aaa6a19',
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then((data: any) => setResultUrl(data.link));

      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResultUrl('FORM NOT VALID');

      setTimeout(() => {
        setResultUrl('');
      }, 2000);
    }
  }

  const onCopiedClick = () => {
    navigator.clipboard.writeText(resultUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  return (
    <>
      <div className='w-screen h-screen bg-gray-50 dark:bg-zinc-800 flex flex-col justify-center items-center p-4 sm:p-0 gap-y-20'>
        <div><p className='text-3xl sm:text-5xl font-bold text-black dark:text-white'>Linkly, URL shortener</p></div>

        <div className='sm:w-2/5 w-full flex flex-row gap-x-8'>
          <input type='text' className="bg-gray-200 dark:bg-zinc-700 block w-full rounded-lg border-gray-300 dark:border-zinc-700 focus:border-gray-300 px-8 py-5 sm:text-lg dark:text-gray-50" placeholder="Paste your link here" onChange={handleChange} value={url} />
          <div className=''>
            <button type="button" className="w-full h-full items-center rounded-lg border border-transparent bg-gray-200 dark:bg-zinc-700 px-5 py-3 text-sm font-medium leading-4 text-gray-700 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-zinc-600"
              onClick={sendRequest}
            >
              {isLoading ? <LoadingDonut />
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              }
            </button>
          </div>
        </div>

        <div className='flex flex-row justify-center items-center gap-x-8'>
          <p className='text-black dark:text-gray-50'>Your shortered link: <span className='text-blue-600 dark:text-gray-50 underline'>{resultUrl}</span></p>
          <button
            type="button"
            className="inline-flex items-center rounded border border-transparent bg-gray-200 dark:bg-zinc-700 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-zinc-600"
            onClick={onCopiedClick}
          >{copied ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
      <div className='fixed bottom-10 w-full flex flex-row justify-center items-center'>
        <a target='_blank' href='https://github.com/filippo-brigati' className='flex flex-row justify-center items-center text-black dark:text-gray-50 font-sm'>
          about
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
        </a>
      </div>
    </>
  );
}

export default App;
