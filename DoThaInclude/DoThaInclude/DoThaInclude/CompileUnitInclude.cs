﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DoThaInclude
{
    public class CompileUnitInclude
    {
        private static readonly Regex INCLUDE_REGEX = new Regex(@"^\s*\#include\s+["" <]([^"">]+)*["" >]");
        public CompileUnitInclude()
        {
        }

        private string _recurApplyIncludes(string srcFolder, string relativeFilePath, HashSet<string> absoluteFilesPath)
        {

            var absoluteFilePath = Path.Combine(srcFolder, relativeFilePath);

            FileInfo f = new FileInfo(absoluteFilePath);
            string fullname = f.FullName;
            if (absoluteFilesPath.Contains(fullname))
                throw new Exception("Circular include on file " + fullname); // TODO this will react to diamond inclusion and we don't want to
            absoluteFilesPath.Add(fullname);
            var currentCodeFile = File.ReadAllText(absoluteFilePath);
            StringBuilder outputFile = new StringBuilder();
            var lines = currentCodeFile.Split(new string[] { "\n", "\n\r" }, StringSplitOptions.None);
            foreach (var line in lines)
            {
                var matchRes = INCLUDE_REGEX.Match(line);
                if (matchRes.Success)
                {
                    var includeFile = matchRes.Groups[1].Value;
                    var currentDirectory = Path.GetDirectoryName(absoluteFilePath);
                    string includeCode = _recurApplyIncludes(currentDirectory, includeFile, absoluteFilesPath);
                    outputFile.AppendLine(includeCode);
                }
                else
                    outputFile.Append(line);
            }
            var outputCode = outputFile.ToString();
            outputCode = outputCode.Replace("\r\n", "\n").Replace("\r", "\n").Replace("\r", "\n").Replace("\n", "\r\n");

            return outputCode;

        }

        /// <summary>
        /// Returns provided shader code with included code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public string ApplyIncludes(string filePath)
        {
            return _recurApplyIncludes(Path.GetDirectoryName(filePath), Path.GetFileName(filePath), new HashSet<string>());
        }

        /// <summary>
        /// Returns provided shader code with included code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public string ApplyIncludesOld(string filePath)
        {
            var regexInclude = new Regex(@"^\s*\#include\s+["" <]([^"">]+)*["" >]");
            var currentCodeFile = File.ReadAllText(filePath);
            var srcPath = Path.GetDirectoryName(filePath);
            StringBuilder outputFile = new StringBuilder();
            var lines = currentCodeFile.Split(new string[] { "\n", "\n\r" }, StringSplitOptions.None);
            foreach (var line in lines)
            {
                var matchRes = regexInclude.Match(line);
                if (matchRes.Success)
                {
                    var includeFile = matchRes.Groups[1].Value;
                    outputFile.AppendLine(File.ReadAllText(System.IO.Path.Combine(srcPath, includeFile)));
                }
                else
                    outputFile.Append(line);
            }

            var outputCode = outputFile.ToString();
            outputCode = outputCode.Replace("\r\n", "\n").Replace("\r", "\n").Replace("\r", "\n").Replace("\n", "\r\n");

            return outputCode;
        }
    }
}
