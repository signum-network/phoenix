/**
 * This small script can be used to generate test deep links
 *
 * To test with the android app you can use the adb tool
 *
 * adb shell am start -W -a android.intent.action.VIEW -d "signum://v1?action=pay..."
 */

const {createDeeplink} = require('@signumjs/util')

/**
{
    "recipient": "S-9K9L-4CB5-88Y5-F5G4Z",
    "amountPlanck": 10000000,
    "feePlanck": 735000,
    "message": "Hi, from a deep link",
    "messageIsText": true,
    "immutable": true,
    "deadline": 24,
    "encrypt": false
}
*/

const PayExampleA = {
    recipient: "S-9K9L-4CB5-88Y5-F5G4Z",
    amountPlanck: 10000000,
    feePlanck: 735000,
    message: "Hi, from a deep link",
    messageIsText: true,
    immutable: false,
    deadline: 24,
    encrypt: false
}

const PayExampleB = {
    recipient: "S-9K9L-4CB5-88Y5-F5G4Z",
    immutable: false,
    deadline: 24,
    encrypt: true
}

const exampleA = createDeeplink({action:'pay', payload:PayExampleA})
const exampleB = createDeeplink({action:'pay', payload:PayExampleB})

console.info("Example A")
console.info("=========")
console.info(exampleA)
console.info("")
console.info("Bash Escaped")
console.info(exampleA.replace('&', '\\&'))
console.info("--------------------")
console.info("Example B")
console.info("=========")
console.info(exampleB)
console.info("")
console.info("Bash Escaped")
console.info(exampleB.replace('&', '\\&'))
