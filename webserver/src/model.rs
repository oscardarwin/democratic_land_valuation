use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TitleDeed {
    pub parcel_id: i32,
    pub center: String, // WKT point
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub user_id: i32,
    pub name: String,
    pub residence_parcel_id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TaxEvaluation {
    pub tax_evaluation_id: i32,
    pub parcel_id: i32,
    pub proposal_submission_start: DateTime<Utc>,
    pub proposal_submission_end: DateTime<Utc>,
    pub voting_end: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TaxProposal {
    pub proposal_id: i32,
    pub tax_evaluation_id: i32,
    pub tax: i32,
    pub text: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Vote {
    pub user_id: i32,
    pub proposal_id: i32,
}
