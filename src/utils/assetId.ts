import { AssetIdInput } from "../sway-api/contracts/Src20";
import { arrayify, concat, sha256 } from "fuels";
import { StdString } from "fuels";

// creates a subId repeating the provided number
export function createSubId(numberToRepeat: number) {
  return numberToRepeat.toString().repeat(32);
}

export function createAssetId(subId: string, contractId: string) {
  const contractIdBytes = arrayify(contractId);
  const subIdBytes = arrayify(subId);
  const bits = sha256(concat([contractIdBytes, subIdBytes]));
  const assetId: AssetIdInput = {
    bits,
  };
  return assetId;
}

export function stdString(name: string) {
  const std_name: StdString = name;
  return std_name;
}

// Function to create a RawBytes type
function createRawBytes(value: string): { ptr: Uint8Array; cap: number } {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(value);
  return {
    ptr: encoded,
    cap: encoded.length,
  };
}

// Function to create a Bytes type
function createBytes(value: string): {
  buf: { ptr: Uint8Array; cap: number };
  len: number;
} {
  const rawBytes = createRawBytes(value);
  return {
    buf: rawBytes,
    len: rawBytes.cap,
  };
}

// Function to create a String type
export function createString(value: string): {
  bytes: { buf: { ptr: Uint8Array; cap: number }; len: number };
} {
  const bytes = createBytes(value);
  return {
    bytes,
  };
}
