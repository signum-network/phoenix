export async function asyncTryRun(tag: string, fn: () => Promise<void>): Promise<void> {
    try{
        console.log(`tryApply [${tag}] executing`);
        return fn();
    }catch (e){
        console.error(`tryApply [${tag}] failed`, e);
    }
}
