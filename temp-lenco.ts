// Simple Lenco API client
export interface LencoAPIConfig {
  apiKey: string;
  baseUrl: string;
  mode: 'test' | 'live';
}

export interface InitializePaymentParams {
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  description: string;
  reference: string;
  redirectUrl: string;
  metadata?: Record<string, any>;
}

export interface InitializePaymentResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    checkoutUrl: string;
  };
}

export class LencoAPI {
  private config: LencoAPIConfig;
  
  constructor(config: LencoAPIConfig) {
    this.config = config;
  }
  
  async initializePayment(params: InitializePaymentParams): Promise<InitializePaymentResponse> {
    // This is a mock implementation for development
    // In production, you would make an actual API call to Lenco
    return {
      status: true,
      message: 'Payment initialization successful',
      data: {
        reference: params.reference,
        checkoutUrl: `/mock-payment?ref=${params.reference}&amount=${params.amount}`
      }
    };
  }
  
  async verifyPayment(reference: string): Promise<any> {
    // Mock implementation
    return {
      status: true,
      message: 'Payment verification successful',
      data: {
        reference,
        amount: 1000,
        status: 'successful',
        metadata: {}
      }
    };
  }
}

// Create and export a singleton instance
export const lencoApi = new LencoAPI({
  apiKey: process.env.LENCO_API_KEY || 'test_key',
  baseUrl: process.env.LENCO_API_URL || 'https://api.lenco.co',
  mode: (process.env.LENCO_MODE as 'test' | 'live') || 'test'
});

export default lencoApi; 