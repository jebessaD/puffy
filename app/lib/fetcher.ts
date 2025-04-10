export const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  };
  
  export const post = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Failed to create product");
    }
  
    return res.json();
  };
  
  export const put = async (url: string, data: any) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
  };

  export const deleteData = async (url: string) => {
    const res = await fetch(url, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to delete data');
    return res.json();
  };

  export const patch = async (url: string, status: string, id: number) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, id }),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
  };

  export const trackingNumberUpdate = async (url: string, trackingNumber: string, id: number) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingNumber, id }),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
  };
  