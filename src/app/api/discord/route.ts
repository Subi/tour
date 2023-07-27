import { Patch } from "../upload/route";

export async function handler(patch:Patch) { // Need to think of a name for this 
    const webhook =  process.env.DISCORD_WEBHOOK as string // Type assertion might be bad need additonal opinons and understanding.

    const response = await fetch(webhook,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "embeds": [
                {
                    "color": 15245354,
                    "fields": [
                        {
                            "name": "State",
                            "value": `${patch.state}`,
                            "inline": true
                        },
                        {
                          "name": "Username",
                          "value": `${patch.Author.username}`,
                          "inline": true
                        },
                        {
                          "name": "PatchId",
                          "value": `${patch.id}`,
                          "inline": true
                        },
                        {
                            "name": "Date",
                            "value": `${patch.date}`,
                            "inline": true
                          },
                          {
                            "name": "Email",
                            "value": `${patch.Author.email}`,
                            "inline": true
                          }
                    ],
                    "image": {
                        "url": `${patch.imageUrl}`
                      }
                }
            ],
            "username":  "Patch Submission"
        })
    })
    if(!response.ok) {
        console.error( response.status  ,  "Error occured sending patch data to server")
    } else {
        console.log( response.status , "Success patch data has been sent to server")
    }
    
}


