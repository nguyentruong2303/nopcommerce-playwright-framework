Role: Senior QA Engineer
# Checklist Review Code Playwright (README)
> Dành cho **Senior QA** khi review PR/commit liên quan đến tự động hóa với **Playwright** (TypeScript/JavaScript). Mục tiêu: **ổn định, dễ bảo trì, rõ ràng, chạy được trên CI**.
---
## 1) Cấu trúc dự án & tổ chức mã nguồn
- [ ] Thư mục rõ ràng: `tests/`, `pages/` (POM), `fixtures/`, `utils/`, `data/`, `config/`, `reports/`.
- [ ] Tách **test logic** khỏi **page/business logic** (áp dụng Page Object Model).
- [ ] Đặt tên file/class/method có nghĩa, nhất quán.
- [ ] Tránh duplicate code (DRY); tạo helper/utility khi lặp lại từ 3 lần trở lên.
- [ ] Không để logic nặng trong `global-setup`/`global-teardown` trừ khi thật cần thiết.
---
## 2) Playwright Test Config (`playwright.config.*`)
- [ ] `use` cấu hình hợp lý: `baseURL`, `viewport`, `timezone`, `locale`, `video`, `screenshot`, `trace`.
- [ ] Thiết lập **projects** cho đa trình duyệt/platform, có tên rõ ràng.
- [ ] Bật `retries` cho test flaky hợp lý (ví dụ: 1–2), **không dùng để che lỗi**.
- [ ] `timeout` tổng và `expect` timeout hợp lý, không để mặc định nếu dự án có đặc thù.
- [ ] `reporter` phù hợp (dot/list/html/Allure) và **được thu thập trên CI**.
---
## 3) Fixtures & Test setup
- [ ] Dùng `test.use()`/fixtures để **chia sẻ state** hợp lý, tránh lạm dụng global state.
- [ ] Fixture **nhẹ**, có teardown rõ ràng; tránh memory leak.
- [ ] Data/secrets qua **env/secret manager**, không hard-code.
- [ ] `beforeEach/afterEach` không làm test phụ thuộc lẫn nhau.
---
## 4) Thiết kế test & tính độc lập
- [ ] Mỗi test kiểm tra **một hành vi chính**; không assert quá nhiều thứ không liên quan.
- [ ] Test **độc lập** (có thể chạy riêng lẻ mà vẫn pass). Tránh phụ thuộc vào thứ tự.
- [ ] Dùng **tag**/annotation (ví dụ `test.describe`, `test.skip`, `test.fixme`) đúng mục đích.
- [ ] Naming: mô tả hành vi/điều kiện/kết quả kỳ vọng rõ ràng.
---
## 5) Locators & Waits (độ ổn định)
- [ ] Ưu tiên `getByRole`, `getByLabel`, `getByTestId` **thay vì** CSS/XPath fragile.
- [ ] Không dùng `page.waitForTimeout()` trừ bất khả kháng; thay bằng chờ **điều kiện**.
- [ ] Tránh `nth()` mơ hồ; đảm bảo locator **duy nhất**.
- [ ] Kiểm tra có `await expect(locator).toBeVisible()`/`toHaveText()` thay vì manual sleep.
- [ ] Thêm `data-testid` ở UI khi cần để tăng độ bền.
---
## 6) Assertions chất lượng
- [ ] Assertions **có ý nghĩa business**, không chỉ kiểm tra sự tồn tại.
- [ ] Dùng `toHaveURL`, `toHaveTitle`, `toHaveText`, `toContainText`, `toHaveAttribute` đúng ngữ cảnh.
- [ ] Tránh assert quá nhiều trong một test => khó debug, tăng flakiness.
- [ ] Thông điệp fail rõ ràng (nếu thêm custom message qua comments/log).
---
## 7) Xử lý dữ liệu test
- [ ] Tách **test data** khỏi test code (JSON/CSV/DB); không hard-code dữ liệu động.
- [ ] Dùng factory/generator cho data unique (email, id).
- [ ] Có cơ chế **cleanup/reset** dữ liệu sau khi chạy (API/DB seed/teardown).
---
## 8) Logging, Trace, Screenshot, Video
- [ ] Có logging tối thiểu giúp debug (step quan trọng, input chính).
- [ ] Bật **trace/screenshot/video** ít nhất cho **failures**; lưu vào artifact CI.
- [ ] Không spam log; tránh log thông tin nhạy cảm.
---
## 9) Hiệu năng & song song
- [ ] Test không mở/đóng browser quá nhiều nếu không cần (tận dụng context).
- [ ] Kiểm soát **parallel** hợp lý (`fullyParallel`, `workers`) tránh race condition.
- [ ] Loại bỏ step thừa; giảm thời gian **end-to-end**.
---
## 10) Tuân thủ code style & chất lượng
- [ ] Bật **ESLint/Prettier**; tuân thủ convention của team.
- [ ] Loại bỏ `console.log` thừa, TODO cũ, dead code.
- [ ] Viết comment **giải thích WHY** (không mô tả WHAT).
- [ ] Đảm bảo type-safety (TypeScript): kiểu rõ ràng, tránh `any` không cần.
---
## 11) Bảo mật & secrets
- [ ] Không commit **token/password**; dùng `.env` + secret manager.
- [ ] Ẩn dữ liệu nhạy cảm trong logs/report.
- [ ] Kiểm tra URL/endpoint không lộ thông tin bí mật.
---
## 12) CI/CD & tính tái lập
- [ ] Config chạy được trên CI (Docker/GitHub Actions/Azure Pipelines) ổn định.
- [ ] Lưu artifacts (report, trace, screenshots) để phục vụ phân tích sau.
- [ ] Seed dữ liệu/test environment trước khi chạy; teardown sau khi xong.
- [ ] Thiết lập **các profile** (dev/stage/prod) qua biến môi trường.
---
## 13) Quản lý flaky tests
- [ ] Đánh dấu tạm thời bằng `test.fixme`/`test.skip` **có lý do cụ thể**.
- [ ] Có issue/ticket track nguyên nhân; không dùng `retries` để che lỗi lâu dài.
- [ ] Phân tích trace/screenshot để **cải thiện locator/wait**.
---
## 14) Quy trình review (gợi ý)
1. **Đọc mô tả PR**: phạm vi, lý do, ảnh hưởng.
2. **Chạy locally** (nếu có thể): `npx playwright test -g "<tên suite>"`.
3. **Kiểm tra cấu trúc & config** (mục 1–2).
4. **Đánh giá test design, locator, waits, assertions** (mục 4–6).
5. **Xem artifacts** (mục 8) khi fail.
6. **Nhận xét cụ thể**: dòng code, đề xuất cải thiện.
7. **Yêu cầu chỉnh sửa** nếu vi phạm nguyên tắc ổn định/bảo trì.
---
## 16) Checklist nhanh (tick khi review)
- [ ] Cấu trúc dự án chuẩn (POM, fixtures, utils).
- [ ] Config Playwright hợp lý (timeouts, retries, reporter, trace).
- [ ] Test độc lập, tên rõ, ít assert thừa.
- [ ] Locator bền vững, không dùng sleep tùy tiện.
- [ ] Data tách riêng, có cleanup.
- [ ] Logging/trace/screenshot đủ cho debug.
- [ ] Chạy tốt trên CI, artifacts được lưu.
- [ ] Tuân thủ code style, không lộ secrets.
- [ ] Có quản lý flaky tests đúng cách.
---
### Ghi chú
- Điều chỉnh checklist theo context dự án (web/app, đa ngôn ngữ, role-based, v.v.).
- Khuyến khích bổ sung **coding standards** của team (ESLint rules, naming conventions, review labels).