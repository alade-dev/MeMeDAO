/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.94.8
  Forc version: 0.64.0
  Fuel-Core version: 0.36.0
*/

import { Contract, Interface } from "fuels";
import type {
  Provider,
  Account,
  StorageSlot,
  AbstractAddress,
  BigNumberish,
  BN,
  FunctionFragment,
  InvokeFunction,
} from 'fuels';

import type { Option } from "./common";

export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;

const abi = {
  "programType": "contract",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "()",
      "concreteTypeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      "type": "enum std::option::Option<struct std::asset_id::AssetId>",
      "concreteTypeId": "191bf2140761b3c5ab6c43992d162bb3dc9d7f2272b2ee5f5eeea411ddedcd32",
      "metadataTypeId": 1,
      "typeArguments": [
        "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 3
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "b256",
      "metadataTypeId": 0
    },
    {
      "type": "enum std::option::Option",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "None",
          "typeId": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          "name": "Some",
          "typeId": 2
        }
      ],
      "typeParameters": [
        2
      ]
    },
    {
      "type": "generic T",
      "metadataTypeId": 2
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 3,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "asset_id",
          "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974"
        }
      ],
      "name": "add_asset_id",
      "output": "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "index",
          "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
        }
      ],
      "name": "get_asset_id",
      "output": "191bf2140761b3c5ab6c43992d162bb3dc9d7f2272b2ee5f5eeea411ddedcd32",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "total_asset_ids",
      "output": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": []
};

const storageSlots: StorageSlot[] = [];

export class TokenFactoryInterface extends Interface {
  constructor() {
    super(abi);
  }

  declare functions: {
    add_asset_id: FunctionFragment;
    get_asset_id: FunctionFragment;
    total_asset_ids: FunctionFragment;
  };
}

export class TokenFactory extends Contract {
  static readonly abi = abi;
  static readonly storageSlots = storageSlots;

  declare interface: TokenFactoryInterface;
  declare functions: {
    add_asset_id: InvokeFunction<[asset_id: AssetIdInput], void>;
    get_asset_id: InvokeFunction<[index: BigNumberish], Option<AssetIdOutput>>;
    total_asset_ids: InvokeFunction<[], BN>;
  };

  constructor(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider,
  ) {
    super(id, abi, accountOrProvider);
  }
}
