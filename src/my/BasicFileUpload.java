package my;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.json.JSONObject;

import af.web.fileupload.AfFileUploadHandler;
import af.web.fileupload.AfFileUploadUtils;

public class BasicFileUpload extends AfFileUploadHandler
{
	String originalFileName;
	String suffix;
	String tmpFileName;
	File tmpFile;
	OutputStream outputStream;
	
	@Override
	protected OutputStream uploadStarted(String originalFileName) throws Exception
	{
		
		this.originalFileName = originalFileName;
		this.suffix = AfFileUploadUtils.fileSuffix( originalFileName);
		this.tmpFileName = AfFileUploadUtils.createUUID() + "." + suffix;
		
		File tmpDir = new File(getWebRoot(), "upload");
		tmpDir.mkdirs();
		
		this.tmpFile = new File(tmpDir, tmpFileName);
		outputStream = new FileOutputStream(tmpFile);	
		
		System.out.println("Start uploading" + originalFileName + " >>> " + tmpFile);
		return outputStream;
	}

	@Override
	protected void uploadProgress(long numBytes) throws Exception
	{
		if(numBytes > 1000000 * 300)
			throw new Exception("Cannot exceed 300M!");
	}

	@Override
	protected void uploadError()
	{
		try{ outputStream.close();} catch(Exception e){}
	}
	
	@Override
	protected Object uploadComplete(long fileSize) throws Exception
	{
		try{ outputStream.close();} catch(Exception e){}
		
		System.out.println("Finish uploading" + originalFileName );
		
		String storePath = "/upload/" + tmpFileName;
		String url = httpReq.getServletContext().getContextPath() + storePath;
		JSONObject result = new JSONObject();
		result.put("storePath", storePath);
		result.put("url", url);		
		return result;
	}



}
