# Technology asset provenance

Retrieved on 2026-10-13. Logos identify third-party products/platforms available for scoped solutions. They are not evidence of vendor endorsement, partnership, certification, or existing delivery of a particular integration. The site section must be titled as a technology ecosystem and linked to the vendors' own sites.

## Sources

| Local asset | Official source | Detail |
| --- | --- | --- |
| `openai.svg`, `openai-dark.svg` | https://openai.com/brand/ → https://cdn.openai.com/brand/openai-logos.zip | Official white/black wordmarks, extracted without modification from `OpenAI-logos/SVGs/OAI_OpenAI_Wordmark_White.svg` and `OAI_OpenAI_Wordmark_Black.svg`. Keep the prescribed clear space. |
| `github.svg`, `github-dark.svg` | https://brand.github.com/foundations/logo → https://brand.github.com/GitHub_Logos.zip | Official 2026 white/black lockups from `GitHub Logos/SVG/GitHub_Lockup_White.svg` and `GitHub_Lockup_Black.svg`. |
| `shopify.svg`, `shopify-dark.svg` | https://www.shopify.com/brand-assets | Official inverted primary and primary SVG, downloaded from Shopify's CDN links on its brand-assets page. |
| `azure.svg` | https://github.com/microsoft/mcp | Official Microsoft Azure icon linked by Microsoft's MCP documentation: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/acom_social_icon_azure |
| `gemini.svg` | https://gemini.google/about/ | Current Gemini star SVG in the official site banner: https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/bd250eedc4ea373301d0b8ce000648a9930b6b28.svg |
| `gcp.png` | https://cloud.google.com/icons | Current official static Super Cloud symbol, linked as the Cloud logo: https://www.gstatic.com/cgc/renaissance/image/MultiPath_Bottom_2X_Centered_static.png. Do not combine the Super Cloud icon into a new logo lockup. The platform name is a separate label. |
| `aws.svg` | https://aws.amazon.com/architecture/icons/ | Official July 2026 AWS Cloud logo vector, extracted without modification from the icon package linked by AWS: https://d1.awsstatic.com/onedam/marketing-channels/website/public/shared/architecture-icon-release/Icon-package_07312026.5846e92413caa21490223536cc97f1269e44fa92.zip, member `Architecture-Group-Icons_07312026/AWS-Cloud-logo_32.svg`. The navy square is part of the supplied asset. |
| `aws.png` | Amazon Web Services official CDN | Retained legacy official white navigation raster: https://a0.awsstatic.com/libra-css/images/logos/aws_smile-header-desktop-en-white_59x35@2x.png. The main registry now uses the vector version above. |
| `cloudflare.svg` | https://www.cloudflare.com/press/press-kit/ | Official white horizontal SVG: https://cf-assets.www.cloudflare.com/dzlvafdwdttg/5hEMO0prBW3wDvchZU0iBZ/8e05bb4c55f8906e58d09dbc861c0f22/CF_logo_horizontal_singlecolor_wht.svg |
| `sentinel.svg` | https://learn.microsoft.com/en-us/azure/architecture/icons/ | Official icon extracted from https://arch-center.azureedge.net/icons/Azure_Public_Service_Icons_V24.zip, member `Azure_Public_Service_Icons/Icons/security/10248-icon-service-Azure-Sentinel.svg`. |
| `defender.svg` | https://learn.microsoft.com/en-us/azure/architecture/icons/ | Official Defender for Cloud icon from the same package, member `Azure_Public_Service_Icons/Icons/security/10241-icon-service-Microsoft-Defender-for-Cloud.svg`. |
| `sonar.svg` | https://www.sonarsource.com/brand-identity/ | Official horizontal Sonar SVG linked on the brand identity page: https://assets-eu-01.kc-usercontent.com/ef593040-b591-0198-9506-ed88b30bc023/5590df23-cc3a-4487-a3dd-e5dcb2da8731/sonar-logo-horizontal.svg |
| `trivy.png` | https://github.com/aquasecurity/trivy/blob/main/docs/imgs/logo.png | Logo from Aqua Security's official Trivy repository, downloaded unaltered from https://raw.githubusercontent.com/aquasecurity/trivy/main/docs/imgs/logo.png. |
| `onetrust.png` | https://www.onetrust.com/brand/ | Current official white primary lockup, copied without modification from https://www.onetrust.com/content/dam/onetrust/brand/portal/public/logos/ot-logo.zip, member `ot-logo/Lockup/ot-logo-lockup-white.png`. The 2042 × 280 transparent PNG is 21.7 KB and avoids the Illustrator-specific entity/switch markup in the companion SVG. No artwork was redrawn, cropped or recolored. |
| `vanta.svg` | https://www.vanta.com/ | Current official navigation wordmark downloaded unmodified from the homepage's `navbar5_logo` image, https://cdn.prod.website-files.com/64009032676f24f376f002fc/6400ac82429afb0f7b31fa6c_vanta-logo.svg. The official press page https://www.vanta.com/company/press also links a brand-assets Drive folder; that folder required sign-in in retrieval, so the public official navigation asset was used. |

OneTrust and Vanta are relevant references for AI governance/privacy and trust/compliance work. Their appearance in the technology ecosystem does not assert a certified partnership, endorsement, or a tested SundAI integration.

Microsoft Purview uses a plain text label until an appropriate official logo can be sourced. OWASP uses a plain text label: the official Foundation page now requires the registered-mark logo, and its current asset kit is hosted in a Google Drive folder. No old mark or invented emblem was substituted.

## Rendering guidance

The registry's `tone: 'light'` means the supplied logo uses white ink and belongs on a dark surface. `tone: 'native'` retains the vendor's original colors. `plate: true` recommends a neutral white plate for the unmodified asset with dark lettering (Sonar, Trivy and Vanta). Do not use CSS filters, recoloring, shadows on the logo artwork, or generated approximations. SVG wordmarks already contain vendor clear space; allow sufficient layout width, especially for the OpenAI canvas. AWS now uses its official navy-square SVG and can scale sharply; allow roughly 100–120 pixels square for conspicuous artwork. The retained navigation PNG is not selected in the main registry.

## Rights

Each vendor retains its trademarks and asset rights. Brand assets are not licensed by SundAI. Follow the linked vendor guidelines. Microsoft architecture icons are provided under the Microsoft terms distributed with the official icon package; those terms are included as `Microsoft_Architecture_Icons_Terms.pdf`. Trivy's repository is Apache-2.0 for code; that does not grant trademark rights.

These files replace previously drawn approximations with directly sourced official artwork. Other pre-existing files (`denmark-mfa.svg`, `ec-council.svg`) are not part of this technology registry and were not refreshed in this pass.
