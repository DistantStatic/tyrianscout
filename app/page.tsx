'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useContext, useState, useEffect } from 'react';

import { Context_ApiKey, Context_Account } from '/app/layout.tsx';



export default function Home() {
	const router = useRouter();
	let {apiKey, setApiKey} = useContext(Context_ApiKey);
//	const [apiKey, setApiKey] = useState("")

	useEffect( () => {
	
	document.cookie = "apikey="+ apiKey;
	}, [apiKey]);

function handleSubmit(e) {
	e.preventDefault();
	let temp_api = e.target[0].value.toString();
	setApiKey(temp_api);
}

  return (
	  <main>
		<center>
		{
			//below needs to be made into its own component
		}
			<span> API Key </span>
			<h3>{apiKey}</h3>
		<form onSubmit={handleSubmit}>
        <textarea
			placeholder=" Api Key"	
			rows={1}
			cols={50}
			value={apiKey}
        />
		<br />
		<button type="submit"> Add API Key </button>
		</form>
	<button disabled={!apiKey} type="button" onClick={() => router.push('/wizard_vault')}>
	Wizard Vault
</button>	
</center>
	  </main>
	);
}
