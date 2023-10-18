/**
 * @class CustomerPGQuery
 * @description class to get all pg queries for customers
 * @author Akshay
 */
class CustomerPGQuery {
  /**
   * @method allCustomersQuery
   * @description method to get query for all customer
   * @author Akshay
   */
  allCustomersQuery(): string {
    const query: string = `
      SELECT
        customer.customer_id,
        (customer.first_name || ' ' || customer.last_name) as name,
        customer.email,
        address.phone,
        address.address,
        city.city,
        address.district,
        address.postal_code,
        country.country
      FROM customer
      LEFT JOIN address
      ON 
        customer.address_id = address.address_id
      LEFT JOIN city
      ON 
        address.city_id = city.city_id
      LEFT JOIN country
      ON 
        city.country_id = country.country_id
      WHERE 
        customer.active = 1
      ORDER BY customer_id ASC
    `;
    return query;
  }

  /**
   * @method customersByIDQuery
   * @description method to get query for customer by id
   * @author Akshay
   */
  customersByIDQuery(id: number): string {
    const query: string = `
      SELECT
        customer.customer_id,
        (customer.first_name || ' ' || customer.last_name) as name,
        customer.email,
        address.phone,
        address.address,
        city.city,
        address.district,
        address.postal_code,
        country.country
      FROM customer
      LEFT JOIN address
      ON 
        customer.address_id = address.address_id
      LEFT JOIN city
      ON 
        address.city_id = city.city_id
      LEFT JOIN country
      ON 
        city.country_id = country.country_id
      WHERE 
        customer.active = 1 AND customer.customer_id = ${id}
      ORDER BY customer_id ASC
    `;
    return query;
  }
}

export default new CustomerPGQuery();
