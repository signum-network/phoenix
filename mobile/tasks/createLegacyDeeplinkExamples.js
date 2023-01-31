/**
 * This small script can be used to generate test deep links
 *
 * To test with the android app you can use the adb tool
 *
 * adb shell am start -W -a android.intent.action.VIEW -d "signum://requestBurst?receiver=...."
 */

const exampleA =
  'signum://requestBurst?receiver=S-LJRV-9LE8-VJ5B-57W4C&amountNQT=20000000000&feeNQT=2205000&immutable=false&message=4c956fdb7701&messageIsText=false';
const exampleB =
  'signum://requestBurst?receiver=S-LJRV-9LE8-VJ5B-57W4C&amountNQT=20000000000&feeNQT=2205000&immutable=true';

console.info('Example A');
console.info('=========');
console.info(exampleA);
console.info('');
console.info('Bash Escaped');
console.info(exampleA.replace('&', '\\&'));
console.info('--------------------');
console.info('Example B');
console.info('=========');
console.info(exampleB);
console.info('');
console.info('Bash Escaped');
console.info(exampleB.replace('&', '\\&'));
