# Postmark SDK Generator Attempt

**Note**: This repository documents an attempt to build a Postmark SDK using the Voxgig SDK Generator. Due to technical issues with the toolchain, the SDK generation was not completed successfully. See [DEVELOPER_EXPERIENCE_REPORT.md](DEVELOPER_EXPERIENCE_REPORT.md) for details.

## About

This project was created as part of an assessment for Voxgig. The goal was to build an open-source SDK for the Postmark Email API using the Voxgig SDK Generator toolchain.

## Status

⚠️ **SDK Generation Incomplete**

The SDK generation process encountered multiple technical issues:
- Node.js version incompatibility (requires Node 24+, environment has Node 20)
- npm spawning issues on Windows
- Missing model files after scaffolding
- apidef tool guide file requirements not met

See [DEVELOPER_EXPERIENCE_REPORT.md](DEVELOPER_EXPERIENCE_REPORT.md) for a detailed analysis of the issues encountered.

## What's Included

- `openapi.yml` - Postmark Email API OpenAPI 3.2.0 specification
- `.sdk/` - Voxgig SDK build directory (partially scaffolded)
- `DEVELOPER_EXPERIENCE_REPORT.md` - Comprehensive developer experience report

## API Information

**Postmark** is a transactional email service that provides reliable email delivery with detailed analytics.

- **Documentation**: https://postmarkapp.com/developer
- **OpenAPI Spec**: https://github.com/api-evangelist/postmark
- **Free Tier**: Available for testing

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Author

Ahmad Wasim

## Assessment Context

This project was completed as part of a paid assessment for Voxgig. The assessment required:
- Building an SDK using the Voxgig SDK Generator
- Time-boxing human work to 30 minutes
- Writing a report on the developer experience
- Publishing under MIT License

Due to the issues encountered, the 30-minute timebox was exceeded. The report documents the experience in detail to help improve the Voxgig SDK Generator toolchain.
