import { baseUrl, url } from "./Address";


export const uploadFile = async (value) => {
    // const fileApi = new FormData();
    // fileApi.append("fileApi", {
    //     uri: value.uri,
    //     name: value.fileName,
    //     type: value.type,
    // });
    const data = new FormData();
    const uriParts = value.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    data.append('fileApi', {
        name: value.fileName,
        type: `image/${fileType}`,
        uri: Platform.OS === 'ios' ? value.uri.replace('file://', '') : value.uri,
    });

    console.log('fileApi', data["_parts"])
    let image = await sendFile(data)
    return image;
}
const sendFile = async (fileApi) => {
    let image;
    await fetch(`${baseUrl}${url}guest/getfile`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: fileApi
    })
        .then(response => response.json())
        .then(response => {
            var err = "res" in response ? true : false;
            if (err) {
                if (response["res"] != 0) {
                    image = response["data"]["name"]
                }
            }
        }).catch(err => console.log('err', err))
    return image;
}

