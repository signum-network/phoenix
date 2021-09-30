import { Amount, convertHexStringToString } from "@signumjs/util";

export function formatAttachmentData(jsonString: string): string {
  try {
    const json = JSON.parse(jsonString);

    if (json["version.Message"]) {
      try{
        return json.messageIsText ? json.message : convertHexStringToString(json.message);
      } catch(e){
        return json.message
      }
    }

    if (json["version.CommitmentAdd"]) {
      return `Added Commitment: ${Amount.fromPlanck(json.amountNQT).toString()}`
    }

    if (json["version.EncryptedMessage"]) {
      // TODO: add decryption feature
      return "[Encrypted Message]";
    }

    if (json["version.MultiOutCreation"] || json["version.MultiSameOutCreation"]) {
      return "[Multiple Recipient List]";
    }

    if (json["version.EncryptedMessage"]) {
      // TODO: add decryption feature
      return "[Encrypted Message]";
    }

    // TODO add more here, i.e. assets

    return jsonString;

  } catch (e) {
    return "[!Attachment Parse Error]";
  }
}
