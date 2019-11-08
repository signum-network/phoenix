# Change Log
All notable changes to this project will be documented in this file.

## 0.4.1
- Patched AES.decrypt method 

## 0.4.0
- Changed License: From GPL-3.0 to Apache 2.0
- Updated seedrandom from 3.0.1 to 3.0.5 (removes eval)

## 0.3.0
- Moved typings into src folder

## 0.2.0
- cleaned up internal converter functions
    - remove unused functions
- fixed seedrandom import issue

## 0.1.3
- now available as standalone bundle (iife)

## 0.1.1
- Encryption/Decryption compatible with BRS
- removed big.js 

## 0.1.0-rc.3
- Encryption/Decryption of message works (not for old messages yet)
- reduced package size
    - words dictionary follows BIP39 standard
    - exchanged BN.js by big.js
