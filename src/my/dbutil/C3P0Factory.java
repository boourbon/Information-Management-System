package my.dbutil;

import java.util.List;

import af.sql.AfSqlConnection;
import af.sql.c3p0.AfC3P0Pool;


public class C3P0Factory
{
	private static AfC3P0Pool pool = null;
	
	static {
		pool = new AfC3P0Pool();
	}
	
	public static AfSqlConnection getConnection() throws Exception
	{
		return pool.getConnection();
	}
		

	public static List executeQuery(String sql, Class clazz) throws Exception
	{
		AfSqlConnection connection = getConnection();
		try{
			return connection.executeQuery(sql, clazz);
		}finally{
			connection.close();
		}	
	}
	
	public static Object get(String sql, Class clazz)throws Exception
	{
		AfSqlConnection connection = getConnection();
		try{
			List rows = executeQuery(sql, clazz);
			if(rows == null || rows.size()== 0)
			{
				return null;
			}
			else 
			{
				return rows.get(0);
			}
		}finally{
			connection.close();
		}	
	}
	
	public static void insert(Object pojo)throws Exception
	{
		AfSqlConnection connection = getConnection();
		try{
			connection.insert(pojo);
		}finally{
			connection.close();
		}	
	}
	
	public static void execute(String sql) throws Exception
	{
		AfSqlConnection connection = getConnection();
		try{
			connection.execute(sql);
		}finally{
			connection.close();
		}	
	}
}
