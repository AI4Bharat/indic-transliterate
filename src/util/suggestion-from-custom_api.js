export const fetchSuggestionFromCustomApi = async (word, customApiURL, transliterationModelId) => {

    let reqBody = {
        modelId: `${transliterationModelId}`,
        task: "transliteration",
        input: [{ "source": `${word}` }],
    }

    let reqHeader = {
        "content-type": "application/json"
    }

    const res = await fetch(
        customApiURL, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: reqHeader
    })

    const response = await res.json();

    if(response && response?.output[0]?.target && response?.output[0]?.target?.length > 0){
        let found = [...response?.output[0]?.target, word]
        return found;
    } else {
        return [word];
    }

}