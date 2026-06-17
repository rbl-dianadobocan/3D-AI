# Changelog

<!-- PR-28-CHANGELOG-START -->
## PR #28 - Search filters

**Author:** @andreistancu21
**Date:** 2026-06-17

### Added
- New `TeamFilters` component for searching and filtering team members by name, role, skill, department, and status.
- Department and status filter pills with clear visual states.
- "Clear filters" button to reset all filters.
- Empty state messaging when no members match filters.
- Join date display on MemberCard.

### Changed
- Team dashboard page now uses the `TeamFilters` component instead of static sorting and grid rendering.
- MemberCard displays department-specific avatar gradients and color-coded badges for department and status.
- Improved layout for member info, including join date and email.

### Testing
- Manual testing required for search and filter functionality, filter pill states, clear filters, empty state, and MemberCard display.
- No automated tests were changed.

### Review Notes
- Review filtering logic for correctness and edge cases.
- Check UI responsiveness and accessibility for filter controls and empty state.
- Confirm MemberCard visual clarity and accessibility.
- Ensure "Clear filters" resets all filter state.

---
<!-- PR-28-CHANGELOG-END -->

<!-- PR-26-CHANGELOG-START -->
## PR #26 - add search/filter controls and richer member card badges

**Author:** @mrcdiana
**Date:** 2026-06-17

### Added
- Search and filter controls for team members (by department, status, and text query)
- New `TeamFilters` component encapsulating filter logic and UI
- Richer member card badges, including department-specific avatar gradients and join date display
- Empty state UI for no matching members

### Changed
- Team dashboard page now renders member grid via `TeamFilters` instead of static sorting
- MemberCard badges and layout updated for improved clarity and visual distinction
- Status and department badge variants standardized

### Testing
- Manual testing required for search, filter, clear filters, and empty state behaviors
- No automated tests were changed

### Review Notes
- Review filter logic for correctness and edge cases
- Check badge rendering and avatar gradients for visual consistency
- Validate empty state and responsiveness of UI controls
- Ensure no regressions in member sorting or display

---
<!-- PR-26-CHANGELOG-END -->

<!-- PR-25-CHANGELOG-START -->
## PR #25 - Update pr-ai-docs.yaml

**Author:** @rbl-dianadobocan
**Date:** 2026-06-17

### Added
- Added a comment (`#pprprprprprpr`) at the top of the `.github/workflows/pr-ai-docs.yaml` file.

### Changed
- Restored the newline at the end of the workflow YAML file for improved formatting.

### Testing
- No automated or manual testing required, as the workflow logic was not changed.

### Review Notes
- Confirm that the YAML file remains valid and that the comment does not affect workflow execution.

---
<!-- PR-25-CHANGELOG-END -->

<!-- PR-23-CHANGELOG-START -->
## PR #23 - Date range filter

**Author:** @rbl-dianadobocan
**Date:** 2026-06-17

### Changed
- Updated `app/(dashboard)/dashboard/page.tsx` (+1/-0).
- Updated `app/(dashboard)/layout.tsx` (+8/-1).
- Updated `components/dashboard/activity-feed.tsx` (+24/-2).
- Updated `components/dashboard/date-range-filter.tsx` (+39/-0).
- Updated `components/dashboard/productivity-chart.tsx` (+21/-2).
- Updated `components/dashboard/tasks-chart.tsx` (+21/-2).
- Updated `components/layout/header.tsx` (+4/-1).
- Updated `components/ui/input.tsx` (+1/-2).
- Updated `lib/date-range-context.tsx` (+63/-0).

### Testing
- Manual validation is recommended.

### Review Notes
- AI changelog generation failed, so this fallback entry was generated automatically.

---
<!-- PR-23-CHANGELOG-END -->

<!-- PR-22-CHANGELOG-START -->
## PR #22 - Date range filter

**Author:** @rbl-dianadobocan
**Date:** 2026-06-17

### Added
- Added `components/dashboard/date-range-filter.tsx`.
- Added `lib/date-range-context.tsx`.

### Changed
- Updated `app/(dashboard)/dashboard/page.tsx` (+1/-0).
- Updated `app/(dashboard)/layout.tsx` (+8/-1).
- Updated `components/dashboard/activity-feed.tsx` (+24/-2).
- Updated `components/dashboard/productivity-chart.tsx` (+21/-2).
- Updated `components/dashboard/tasks-chart.tsx` (+21/-2).
- Updated `components/layout/header.tsx` (+4/-1).
- Updated `components/ui/input.tsx` (+1/-2).

### Testing
- No automated test files were detected in this PR.

### Notes
- Total scope: 9 file(s), +182/-10 lines.

---
<!-- PR-22-CHANGELOG-END -->

<!-- PR-21-CHANGELOG-START -->
## PR #21 - Date range filter

**Author:** @mrcdiana  
**Date:** 2026-06-17 11:23:31 UTC

### Added
- Added `components/dashboard/date-range-filter.tsx`.
- Added `lib/date-range-context.tsx`.
- Added `ENTRY_AGE_HOURS` in `components/dashboard/activity-feed.tsx`.
- Added `RANGE_MAX_HOURS` in `components/dashboard/activity-feed.tsx`.
- Added `visibleItems` in `components/dashboard/activity-feed.tsx`.
- Added `maxHours` in `components/dashboard/activity-feed.tsx`.
- Added `OPTIONS` in `components/dashboard/date-range-filter.tsx`.
- Added `function` in `components/dashboard/date-range-filter.tsx`.
- Added `RANGE_SLICE` in `components/dashboard/productivity-chart.tsx`.
- Added `filteredData` in `components/dashboard/productivity-chart.tsx`.
- Added `sliceCount` in `components/dashboard/productivity-chart.tsx`.
- Added `RANGE_SLICE` in `components/dashboard/tasks-chart.tsx`.

### Changed
- Updated `app/(dashboard)/dashboard/page.tsx` (+1/-0).
- Updated `app/(dashboard)/layout.tsx` with import or dependency-related changes (+8/-1).
- Updated `components/dashboard/activity-feed.tsx` with import or dependency-related changes (+24/-2).
- Updated `components/dashboard/productivity-chart.tsx` with import or dependency-related changes (+21/-2).
- Updated `components/dashboard/tasks-chart.tsx` with import or dependency-related changes (+21/-2).
- Updated `components/layout/header.tsx` with import or dependency-related changes (+4/-1).
- Updated `components/ui/input.tsx` (+1/-2).

### Fixed
- No explicit bug fix could be automatically identified from the diff.

### Technical
- Updated imports or dependencies.

### Notes
- Total scope: 9 file(s), +182/-10 lines.
- Frontend impact: 9 file(s).
- No automated test changes were detected.

---
<!-- PR-21-CHANGELOG-END -->

<!-- PR-20-CHANGELOG-START -->
## PR #20 - feat(dashboard): add date-range filter wired to URL params and charts

**Author:** @mrcdiana  
**Date:** 2026-06-17 11:20:12 UTC

### Added
- Added `components/dashboard/date-range-filter.tsx`.
- Added `lib/date-range-context.tsx`.
- Added `ENTRY_AGE_HOURS` in `components/dashboard/activity-feed.tsx`.
- Added `RANGE_MAX_HOURS` in `components/dashboard/activity-feed.tsx`.
- Added `visibleItems` in `components/dashboard/activity-feed.tsx`.
- Added `maxHours` in `components/dashboard/activity-feed.tsx`.
- Added `OPTIONS` in `components/dashboard/date-range-filter.tsx`.
- Added `function` in `components/dashboard/date-range-filter.tsx`.
- Added `RANGE_SLICE` in `components/dashboard/productivity-chart.tsx`.
- Added `filteredData` in `components/dashboard/productivity-chart.tsx`.
- Added `sliceCount` in `components/dashboard/productivity-chart.tsx`.
- Added `RANGE_SLICE` in `components/dashboard/tasks-chart.tsx`.

### Changed
- Updated `app/(dashboard)/dashboard/page.tsx` (+1/-0).
- Updated `app/(dashboard)/layout.tsx` with import or dependency-related changes (+8/-1).
- Updated `components/dashboard/activity-feed.tsx` with import or dependency-related changes (+24/-2).
- Updated `components/dashboard/productivity-chart.tsx` with import or dependency-related changes (+21/-2).
- Updated `components/dashboard/tasks-chart.tsx` with import or dependency-related changes (+21/-2).
- Updated `components/layout/header.tsx` with import or dependency-related changes (+4/-1).
- Updated `components/ui/input.tsx` (+1/-2).

### Fixed
- No explicit bug fix could be automatically identified from the diff.

### Technical
- Updated imports or dependencies.

### Notes
- Total scope: 9 file(s), +182/-10 lines.
- Frontend impact: 9 file(s).
- No automated test changes were detected.

---
<!-- PR-20-CHANGELOG-END -->

<!-- PR-15-CHANGELOG-START -->
## PR #15 - prv9

**Author:** @andreistancu21  
**Date:** 2026-06-17 10:43:46 UTC

### Added
- No new files or public functions detected.

### Changed
- Updated `.github/workflows/pr-ai-docs.yaml` (+2/-2).

### Fixed
- No explicit bug fix could be automatically identified from the diff.

### Technical
- Updated configuration-related files: `.github/workflows/pr-ai-docs.yaml`.

### Notes
- Total scope: 1 file(s), +2/-2 lines.
- Configuration impact: 1 file(s).
- No automated test changes were detected.

---
<!-- PR-15-CHANGELOG-END -->

All notable changes to this project will be documented in this file.

---
