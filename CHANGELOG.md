# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-01-19

### Fixed
- Fixed account, contract, history, order, position, and trade REST API responses to include `errorMessage`, `errorCode`, and `success` fields in the root of the response payload.

## [1.0.1] - 2026-01-19

### Fixed

- Fixed CommonJS (.cjs) exports not being included in the published package. The tsup build configuration now correctly outputs `index.cjs` for CommonJS and `index.js` for ESM, matching the package.json exports.

## [1.0.0] - 2025-01-17

### Added

- Initial release
- Full REST API coverage for TopstepX trading API
- Real-time WebSocket data feeds via Microsoft SignalR
- Automatic token management with refresh
- Complete TypeScript type definitions
- Dual ESM/CommonJS support
