# Change Log
All notable changes to this project will be documented in this file.

## 1.0.0 (TBR)

- Rebranding

### Breaking changes

- Rebranding
- Removed all deprecated functions
- Several Renamed Functions and classes

----------------------------------------------------
> Before Rebranding

 
## 0.6.0
- `BurstValue.clone()` added
- `BurstValue.fromPlanck()` accepts number now
- Added hex <> base36 conversion

### Improved
- `parseDeeplink`, `createDeeplink`
  - made domain optional
  - builtin decoding of payload

## 0.5.0

### Added 
- New `BurstTime` value object class 
    - facilitates usage of Burst Timestamps
- New `BurstValue` value object class 
    - facilitates usage of BURST/Planck
    - increased numeric precision
- New `createDeeplink` and `parseDeeplink` methods
    - CIP22 implementation
- Added Base64 conversion (URI and UTF-8 compatible)
    - `convertStringToBase64String`
    - `convertBase64StringToString`
- Added Decimal to Hex conversion (Two's Complement support)
    - `convertDecStringToHexString`
- New Symbols for BURST (Ƀ) and Planck (ƀ)
    - `BurstSymbol`
    - `BurstPlanckSymbol`
     
### Deprecated
- `convertBurstTimeToDate` and `convertDateToBurstTime`
    - Use `BurstTime` instead  
- `convertNumberToNQTString`, `convertNQTStringToNumber`, and `sumNQTStringToNumber`
    - Use `BurstValue` instead  


## 0.4.0
- Changed License: From GPL-3.0 to Apache 2.0

## 0.2.0
- added several conversion functions
    - namely byteArray x string x hex
    - `convertHexStringtoDecString`

## 0.1.3
- now available as standalone bundle (iife)
- patched `sumNQTStringToNumber` to be accessible

## 0.1.2
- added `sumNQTStringToNumber`

## 0.1.0-rc.3
- Timestamp conversion functions

## 0.0.13 (2019-02-03)
### Added
- Added `@signumjs/utils` library for common utils.

### Changed
- Removed BurstUtils from `@signumjs/core`.
