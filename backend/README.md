# EcoCollect API

Waste Management System - Laravel Backend API

## Overview

EcoCollect is a waste management system that allows users to:
- Request waste collection from waste collectors
- Track orders and earn points for collected waste
- Convert points to monetary balance
- Comprehensive admin management

## Requirements

- PHP >= 8.1
- Composer
- Node.js (optional)
- MySQL or PostgreSQL
- Laravel Passport (for authentication)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/gh200253/ecocollect-api.git
cd ecocollect-api
```

### 2. Install dependencies

```bash
composer install
npm install  # if using frontend assets
```

### 3. Setup environment file

```bash
cp .env.example .env
php artisan key:generate
```

Edit the `.env` file and add:
- Database configuration
- Twilio settings (for verification SMS)
- Laravel Passport settings

### 4. Create database

Create a new database in your database manager.

### 5. Run migrations

```bash
php artisan migrate
```

### 6. Setup Laravel Passport

```bash
php artisan passport:install
```

### 7. Run the application

```bash
php artisan serve
```

The application will run on: `http://127.0.0.1:8000`

## Authentication

The project uses Laravel Passport for authentication. There are 3 types of users:

1. **Users** - Regular users (`auth:api`)
2. **Waste Collectors** - Waste collectors (`auth:waste_collectors`)
3. **Admins** - Administrators (`auth:admins`)

## API Endpoints

### Authentication - Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/signup` | Register new user | No |
| POST | `/api/login` | User login | No |
| GET | `/api/user/profile` | Get user profile | Yes |
| PUT | `/api/user/profile` | Update user profile | Yes |
| GET | `/api/user/order/{id}` | Get order details | Yes |
| GET | `/api/user/orders/current` | Current orders | Yes |
| GET | `/api/user/orders/past` | Past orders | Yes |
| GET | `/api/nearby-collectors` | Nearby waste collectors | Yes |
| POST | `/api/phone/send-code` | Send verification code | No |
| POST | `/api/phone/verify` | Verify code | No |

### Waste Collectors

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/waste-collector/register` | Register waste collector | No |
| POST | `/api/waste-collector/login` | Collector login | No |
| GET | `/api/waste-collector/profile` | Get collector profile | Yes |
| PUT | `/api/waste-collector/profile` | Update collector profile | Yes |
| GET | `/api/waste-collector/orders` | All orders | Yes |
| GET | `/api/waste-collector/order/{id}` | Order details | Yes |
| GET | `/api/waste-collector/nearby-users` | Nearby users | Yes |
| GET | `/api/users/waste-collectors` | List all collectors | No |

### Orders & Pickup

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders/choose-collector` | Choose collector and create order | Yes |
| POST | `/api/orders/schedule-pickup` | Schedule pickup time | Yes |
| POST | `/api/convert-order-to-points/{id}` | Convert order to points | Yes |
| POST | `/api/orders/{id}/accept` | Accept order (collector) | No |
| POST | `/api/orders/{id}/reject` | Reject order (collector) | No |
| POST | `/api/order-completed` | Complete order | No |

### Earnings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/earnings/{user_id}` | View earnings | Yes |
| POST | `/api/earnings/convert-points` | Convert points to money | Yes |
| GET | `/api/earnings/transactions` | Transaction history | Yes |

### Notifications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/notifications/collector-schedule` | Notify collector of schedule | No |
| GET | `/api/notifications/user/{id}` | User notifications | No |
| GET | `/api/notifications/collector/{id}` | Collector notifications | No |

### Admin

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/register` | Admin register/login | No |
| GET | `/api/admin/users` | All users | Yes |
| GET | `/api/admin/waste-collectors` | All collectors | Yes |
| GET | `/api/admin/orders` | All orders | Yes |
| GET | `/api/admin/total-waste` | Total waste in tons | Yes |
| GET | `/api/admin/waste-percentage-status` | Waste percentage by status | Yes |
| GET | `/api/admin/waste-by-type` | Waste by type | Yes |
| GET | `/api/admin/dashboard-summary` | Dashboard summary | Yes |
| GET | `/api/admin/transactions/pending` | Pending transactions | Yes |
| PATCH | `/api/admin/transactions/{id}/status` | Update transaction status | Yes |
| POST | `/api/admin/waste-types/prices` | Update waste type prices | Yes |
| GET | `/api/admin/waste-types` | All waste types | Yes |

## Database

### Main Tables:

- `users` - Users
- `waste_collectors` - Waste collectors
- `waste_types` - Waste types
- `waste_type_current_orders` - Orders
- `waste_type_order_items` - Order items
- `user_wallets` - User wallets
- `transactions` - Financial transactions
- `user_notifications` - User notifications
- `collector_notifications` - Collector notifications
- `admins` - Administrators

## Recent Fixes

The following issues have been fixed:

- Added missing columns in database tables
- Fixed `convertOrderToPoints` to sum quantities from items
- Added `auth:admins` protection on admin endpoints
- Updated all Models to include new fields
- Created new migrations for missing columns

For full details, see [FIXES_SUMMARY.md](FIXES_SUMMARY.md)

## Important Notes

- All endpoints requiring authentication need `Authorization: Bearer {token}` in headers
- Verification codes are sent via Twilio (requires setup in `.env`)
- Points are calculated based on collected quantity (100 points = 1 currency unit)

## Development

### Run Tests

```bash
php artisan test
```

### Create New Migration

```bash
php artisan make:migration create_table_name
```

### Create New Controller

```bash
php artisan make:controller ControllerName
```

## License

This project is open source and available for use.

## Contributors

- [gh200253](https://github.com/gh200253)

## Support

For support and inquiries, please open a new [Issue](https://github.com/gh200253/ecocollect-api/issues).

---

**Developed with Laravel Framework**
