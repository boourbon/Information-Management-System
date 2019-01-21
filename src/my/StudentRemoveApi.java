package my;

import java.util.HashMap;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import af.sql.AfSqlWhere;
import af.web.restful.AfRestfulApi;
import my.dbutil.C3P0Factory;

public class StudentRemoveApi extends AfRestfulApi
{
	@Override
	public Object execute(JSONObject jreq) throws Exception
	{
		int id = jreq.getInt("id");
		
		AfSqlWhere where = new AfSqlWhere();
		where.add2("id", id);
		String sql = "delete from student" + where;
		C3P0Factory.execute(sql);
		return null;
	}

}
