export function addPayloadItem(content){
  return { type: 'ADD_PAYLOAD_ITEM', content }
}

export function replacePayloadItem(content){
  return { type: 'REPLACE_PAYLOAD_ITEM', content }
}
