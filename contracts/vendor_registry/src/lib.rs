#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, symbol_short};

#[contracttype]
#[derive(Clone)]
pub struct VendorInfo {
    pub address: Address,
    pub name: String,
    pub category: String,
    pub registered_at: u64,
    pub total_payments: u64,
    pub total_volume: i128,
}

#[contracttype]
pub enum DataKey {
    Vendor(Address),
    VendorCount,
}

#[contract]
pub struct VendorRegistry;

#[contractimpl]
impl VendorRegistry {
    /// Register a new vendor
    pub fn register_vendor(
        env: Env,
        vendor: Address,
        name: String,
        category: String,
    ) -> bool {
        vendor.require_auth();

        let key = DataKey::Vendor(vendor.clone());

        // Don't re-register
        if env.storage().persistent().has(&key) {
            return false;
        }

        let info = VendorInfo {
            address: vendor.clone(),
            name,
            category,
            registered_at: env.ledger().timestamp(),
            total_payments: 0,
            total_volume: 0,
        };

        env.storage().persistent().set(&key, &info);

        let count: u64 = env.storage().instance().get(&DataKey::VendorCount).unwrap_or(0);
        env.storage().instance().set(&DataKey::VendorCount, &(count + 1));

        env.events().publish(
            (symbol_short!("register"), vendor),
            true
        );

        true
    }

    /// Record a payment (called after successful XLM transfer)
    pub fn record_payment(
        env: Env,
        vendor: Address,
        amount: i128,
        memo: String,
    ) -> u64 {
        vendor.require_auth();

        let key = DataKey::Vendor(vendor.clone());
        let mut info: VendorInfo = env.storage().persistent()
            .get(&key)
            .expect("Vendor not registered");

        info.total_payments += 1;
        info.total_volume += amount;

        env.storage().persistent().set(&key, &info);

        env.events().publish(
            (symbol_short!("payment"), vendor),
            amount
        );

        info.total_payments
    }

    /// Get vendor info
    pub fn get_vendor(env: Env, vendor: Address) -> Option<VendorInfo> {
        let key = DataKey::Vendor(vendor);
        env.storage().persistent().get(&key)
    }

    /// Check if vendor is registered
    pub fn is_registered(env: Env, vendor: Address) -> bool {
        env.storage().persistent().has(&DataKey::Vendor(vendor))
    }

    /// Get total vendor count
    pub fn vendor_count(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::VendorCount).unwrap_or(0)
    }
}
