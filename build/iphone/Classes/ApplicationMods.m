#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"tiadmaker",@"name",@"co.saiten.ti.admaker",@"moduleid",@"0.1",@"version",@"c650f77c-ce79-4fd9-8fb1-9c9ce5564a3c",@"guid",@"",@"licensekey",nil]];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"admob",@"name",@"ti.admob",@"moduleid",@"1.1",@"version",@"0d005e93-9980-4739-9e41-fd1129c8ff32",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
